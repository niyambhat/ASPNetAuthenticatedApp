import React, { useContext, useState, useEffect } from 'react';
import { Button,  FormField,  Label,  Segment } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';
import { ActivityContext } from '../../../ActivityContext';
import { useParams } from 'react-router';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import MyDateInput from './MyDateInput';

interface Props {
  closeForm: () => void;
  activity: Activity | undefined;
  createOrEdit: (activity: Activity) => void;
  submitting: boolean;
}
// let test= "2023-09-09T04:32:39.37884";

function ActivityForm() {
  const { handleFormClose, selectedActivity, handleCreateOrEditActivity, submitting } = useContext(ActivityContext);
  const initialState = selectedActivity ?? {
    id: '',
    title: '',
    category: '',
    description: '',
    date: '',
    city: '',
    venue: ''
  };

  const [activity, setActivity] = useState(initialState);
  const validationSchema = Yup.object({
    title:Yup.string().required("The activity title is required"),
    description:Yup.string().required("The activity description is required"),
    category:Yup.string().required("The activity category is required"),
    date:Yup.string().required("The activity date is required"),
    city:Yup.string().required("The activity city is required"),
    venue:Yup.string().required("The activity venue is required")
  })


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchActivity = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/activities/${id}`); // Replace with your actual API endpoint
        setActivity(response.data);
        setLoading(false);
      } catch (error) {
        setError('Error fetching activity');
        setLoading(false);
      }
    };

    if (id) {
      fetchActivity();
    }
  }, [id]);

  const handleFormSubmit = (activity:Activity) => {
    handleCreateOrEditActivity(activity);
  };

  return (
    <Segment clearing>
      {loading ? (
        <div>Loading activity...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <>
       <Formik initialValues={activity}
       validationSchema={validationSchema}
       onSubmit={values => handleFormSubmit(values)}>
        {({handleSubmit})=>(
             <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
             <FormField>
             <Field
               placeholder="Title"
               name="title"
             />
             <ErrorMessage name="title" render={error=> <Label basic color="red" content={error}/>}/>
             </FormField>
            
            <FormField>
            <Field
               placeholder="Description"
               name="description"
             />
             <ErrorMessage name="description" render={error=> <Label basic color="red" content={error}/>}/>
            </FormField>
            
            <FormField>
            <Field
               placeholder="Category"
               name="category"
             />
            <ErrorMessage name="category" render={error=> <Label basic color="red" content={error}/>}/>
            </FormField>
             
             {/* <FormField>
             <Field
               placeholder="Date"
               type='date'
               name="date"
             />
            <ErrorMessage name="date" render={error=> <Label basic color="red" content={error}/>}/>
             </FormField> */}
             <MyDateInput 
             placeholderText="Date"
             name="date"
             showTimeSelect
             timeCaption="time"
             dateFormat = 'MMMM d, yyyy h:mm aa'
             />

             <FormField>
             <Field
               placeholder="City"
               name="city"
             />
             <ErrorMessage name="city" render={error=> <Label basic color="red" content={error}/>}/>
             </FormField>
             
             <FormField>
             <Field
               placeholder="Venue"
               name="venue"
             />
            <ErrorMessage name="venue" render={error=> <Label basic color="red" content={error}/>}/>
             </FormField>
             
             <Button loading={submitting} floated="right" positive type="submit" content="Submit" />
             <Button floated="right" onClick={() => handleFormClose()} content="Cancel" />
           </Form>
        )}
       </Formik>
        </>
       
      )}
    </Segment>
  );
}

export default ActivityForm;
