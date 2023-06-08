import React, { useEffect, useState } from 'react'
import { Grid, GridColumn, List, ListItem } from 'semantic-ui-react'
import { Activity } from '../../../models/Activity'
import ActivityList from './ActivityList'
import ActivityDetails from './ActivityDetails'
import ActivityForm from '../form/ActivityForm'
import agent from '../../../api/agent'
import Loading from '../../../layout/Loading'

interface Props {
  activities: Activity[],
  selectActivity: (id: string) => void,
  selectedActivity: Activity | undefined,
  cancelSelectedActivity: () => void,
  openForm: (id:string) => void,
  closeForm: () => void,
  editMode:boolean,
  createOrEdit:(activity:Activity)=>void,
  deleteActivity: (id:string) => void,
  submitting:boolean
}

function ActivityDashboard() {
const [activities, setActivities] = useState<Activity[]>([]);
const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();
const [editMode, setEditMode] = useState<boolean>(false);
const [loading, setLoading] = useState<boolean>(true)
const [submitting, setSubmitting] = useState<boolean>(false)

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id == id));
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  }
  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true)
  }
  const handleFormClose = () => {
    setEditMode(false);
  }
  const handleCreateOreditActivity=(activity:Activity)=>{
    setSubmitting(true);
    if(activity.id){
      agent.Activities.update(activity).then(()=>{
      setActivities([...activities.filter(x=>x.id !== activity.id), activity]);
      setEditMode(false);
      setSelectedActivity(activity);
      setSubmitting(false);
      })
     
    } else {
      activity.id =uuid();
      agent.Activities.update(activity).then(()=>{
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
    })
  }
  }

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(()=>{
      console.log("Success");
      setActivities([...activities.filter(x=>x.id !== id)])
      setSubmitting(false);
    })
  }


  useEffect(() => {
    agent.Activities.list().then(response => {
      let activities:Activity[] = [];
       response.forEach(activity=>{
        activity.date = activity.date.split("T")[0];
       })
        setActivities(response);
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);
  

  if(loading) return <Loading content='Loading...'/>
  return (
    <>
      {activities.length > 0 ?
        <Grid>
          <GridColumn width={10}>
            <ActivityList activities={activities} selectActivity={handleSelectActivity} deleteActivity={handleDeleteActivity} submitting={submitting}/>
          </GridColumn>
          {/* <GridColumn width={6}>
            {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity} openForm={openForm} />}
            {editMode && <ActivityForm  closeForm={ closeForm} activity={selectedActivity} createOrEdit={createOrEdit} submitting={submitting}/> }
            
          </GridColumn> */}
        </Grid> :
        <p>loading</p>}
    </>
  )
}

export default ActivityDashboard

function uuid(): string {
  throw new Error('Function not implemented.')
}
