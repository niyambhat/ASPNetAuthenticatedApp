import React from 'react'
import { Grid, GridColumn, List, ListItem } from 'semantic-ui-react'
import { Activity } from '../../../models/Activity'
import ActivityList from './ActivityList'
import ActivityDetails from './ActivityDetails'
import ActivityForm from '../form/ActivityForm'

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

function ActivityDashboard({ activities, selectActivity, selectedActivity, cancelSelectedActivity, openForm, closeForm, editMode, createOrEdit,deleteActivity,submitting }: Props) {
  return (
    <>
      {activities.length > 0 ?
        <Grid>
          <GridColumn width={10}>
            <ActivityList activities={activities} selectActivity={selectActivity} deleteActivity={deleteActivity} submitting={submitting}/>
          </GridColumn>
          <GridColumn width={6}>
            {selectedActivity && !editMode && <ActivityDetails activity={selectedActivity} cancelSelectedActivity={cancelSelectedActivity} openForm={openForm} />}
            {editMode && <ActivityForm  closeForm={ closeForm} activity={selectedActivity} createOrEdit={createOrEdit} submitting={submitting}/> }
            
          </GridColumn>
        </Grid> :
        <p>loading</p>}
    </>
  )
}

export default ActivityDashboard