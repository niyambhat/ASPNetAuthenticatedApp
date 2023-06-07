import React, { useEffect, useState } from 'react';
import "../App.css"
import axios from 'axios';
import { Button, Container, Header, List, ListItem } from 'semantic-ui-react'
import { Activity } from '../models/Activity';
import Navbar from './Navbar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from "uuid";
import agent from '../api/agent';
import Loading from './Loading';

function App() {
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
    <div className="App">
      <Navbar openForm={handleFormOpen}/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
          activities={activities}
          selectActivity={handleSelectActivity}
          selectedActivity={selectedActivity}
          cancelSelectedActivity={handleCancelSelectActivity}
          editMode={editMode}
          openForm={handleFormOpen}
          closeForm={handleFormClose}
          createOrEdit ={handleCreateOreditActivity}
          deleteActivity = {handleDeleteActivity}
          submitting={submitting}
        />
        
      </Container>
    </div>
  );
}

export default App;
