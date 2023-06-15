import { ErrorMessage, Field, Form, Formik } from 'formik'
import React, { useContext } from 'react'
import { Button, FormField, Label } from 'semantic-ui-react'
import * as Yup from "yup";
import { UserContext } from '../../UserContext';


function LoginForm() {

const {login, submitting} = useContext(UserContext);
  return (
    <Formik
    initialValues={{ email: "", password: "", errors: null }}
    onSubmit={(values, { setErrors }) =>
      login(values).catch(() => {
        setErrors({ errors: "Invalid email or password" });
      })
    }
  >
        {({handleSubmit, errors})=>(
          <Form className="ui form" onSubmit={handleSubmit} autoComplete="off">
             <FormField>
             <Field
               placeholder="Email"
               name="email"
             />
             <ErrorMessage name="email" render={error=> <Label basic color="red" content={error}/>}/>
             </FormField>
            
            <FormField>
            <Field
               placeholder="Password"
               name="password"
               type="password"
             />
             <ErrorMessage name="password" render={error=> <Label basic color="red" content={error}/>}/>
            </FormField>
            <ErrorMessage name="errors" render={() => <Label style={{marginBottom: 10}} basic color="red" content={errors.errors} />} />
            <Button loading={submitting} positive content="Login" type="submit" fluid/>
          </Form>
        )}
    </Formik>
  )
}

export default LoginForm