import React, { Fragment, useEffect, useState } from 'react'
import { Activity } from '../../../models/Activity'
import { Button, Header, Item, Label, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom';
import ActivityListItem from './ActivityListItem';

interface Props {
  activities: Activity[],
  selectActivity: (id: string) => void,
  deleteActivity: (id:string) => void,
  submitting:boolean
}

function ActivityList({ activities, selectActivity,deleteActivity,submitting }: Props) {

const groupedActivities: [string, Activity[]][] =  Object.entries(activities.reduce((activities:any, activity:any)=>{
  const date = activity.date;
  activities[date] = activities[date] ? [...activities[date], activity] : [activity];
  return activities;
}, {} as {[key:string] : Activity[]}))

  return (
    <>
    {groupedActivities.map(([group, activities])=>(
      <Fragment key={group}>
        <Header sub color="teal">
          {group}
        </Header>
        <Segment>
      <Item.Group divided>
        {activities.map((activity:Activity) => {
          return (
            <ActivityListItem key={activity.id} activity={activity}/>
          )
        })
        }
      </Item.Group>
    </Segment>
      </Fragment>
    ))}  
  
    
    </>
  )
}

export default ActivityList