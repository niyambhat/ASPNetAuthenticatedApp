import React, { useContext, useEffect } from 'react';
import { Grid, GridColumn } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';
import ActivityList from './ActivityList';
import ActivityDetails from './ActivityDetails';
import ActivityForm from '../form/ActivityForm';
import agent from '../../../api/agent';
import Loading from '../../../layout/Loading';
import { ActivityContext } from '../../../ActivityContext';
import ActivityFilters from './ActivityFilters';


function ActivityDashboard() {
  const {
    activities,
    loading,
    submitting,
    handleSelectActivity,
    handleDeleteActivity,
    setActivities,
    setLoading,
  } = useContext(ActivityContext);

  useEffect(() => {
    agent.Activities.list()
      .then(response => {
        let activities: Activity[] = [];
        response.forEach(activity => {
          activity.date = activity.date.split('T')[0];
        });
        setActivities(getActivitiesByDate(response));
        setLoading(false);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const getActivitiesByDate=(Array:any)=>{
    return Array.sort((a:any,b:any)=>Date.parse(a.date) - Date.parse(b.date));
  }

  if (loading) return <Loading content="Loading..." />;
  return (
    <>
      {activities.length > 0 ? (
        <Grid>
          <GridColumn width={10}>
            <ActivityList
              activities={activities}
              selectActivity={handleSelectActivity}
              deleteActivity={handleDeleteActivity}
              submitting={submitting}
            />
          </GridColumn>
          <GridColumn width={6}>
           <ActivityFilters/>
          </GridColumn>
        </Grid>
      ) : (
        <p>loading</p>
      )}
    </>
  );
}

export default ActivityDashboard;
