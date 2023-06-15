import React, { useContext, useEffect, useState } from 'react'
import ActivityDetailedHeader from './ActivityDetailedHeader'
import ActivityDetailedInfo from './ActivityDetailedInfo'
import ActivityDetailedChat from './ActivityDetailedChat'
import { Grid, GridColumn } from 'semantic-ui-react'
import ActivityDetailedSideBar from './ActivityDetailedSideBar'
import axios from 'axios'
import { useParams } from 'react-router'
import { ActivityContext } from '../../../ActivityContext'
import Loading from '../../../layout/Loading'
import { Activity } from '../../../models/Activity'

interface Props {
    activity: Activity;
    cancelSelectedActivity: () => void;
    openForm: (id: string) => void;
  }
  
  function ActivityDetails() {
    const { selectedActivity, handleCancelSelectActivity, handleFormOpen } = useContext(ActivityContext);
    const { id } = useParams();
    const [activityDetails, setActivityDetails] = useState<Activity | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
  
  
    useEffect(() => {
      const fetchActivityDetails = async () => {
        try {
          const response = await axios.get(`/activities/${id}`);
          setActivityDetails(response.data);
        } catch (error) {
          console.error(error);
        }finally {
          setLoading(false);
        }
      };
  
      fetchActivityDetails();
    }, [id]);
  
  
    if (loading) {
      return <Loading content="Loading..." />;
    }

    
  return (
    <Grid>
        <Grid.Column width={10}>
            <ActivityDetailedHeader activity={activityDetails ? activityDetails : null} />
            <ActivityDetailedInfo activity={activityDetails ? activityDetails : null}/>
            <ActivityDetailedChat/> 
        </Grid.Column>
        <Grid.Column width={6}>
            <ActivityDetailedSideBar/>
        </Grid.Column>
    </Grid>
    )
}

export default ActivityDetails