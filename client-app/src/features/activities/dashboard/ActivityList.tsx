import React, { useState } from 'react'
import { Activity } from '../../../models/Activity'
import { Button, Item, Label, Segment } from 'semantic-ui-react'

interface Props {
  activities: Activity[],
  selectActivity: (id: string) => void,
  deleteActivity: (id:string) => void,
  submitting:boolean
}
function ActivityList({ activities, selectActivity,deleteActivity,submitting }: Props) {
  const [target, setTarget] = useState('');
  const handleACtivityDelete=(e:any ,id:string)=>{
    setTarget(e.target.name);
    deleteActivity(id);
  }
  return (
    <Segment>
      <Item.Group divided>
        {activities && activities.map((item) => {
          return (
            <Item key={item.id}>
              <Item.Content>
                <Item.Header as='a'>
                  {item.title}
                </Item.Header>
                <Item.Meta>
                  {item.date}
                </Item.Meta>
                <Item.Description>
                  <div>{item.description}</div>
                  <div>{item.city} {item.venue}</div>
                </Item.Description>
                <Item.Extra>
                  <Button onClick={() => selectActivity(item.id)} floated="right" content="View" color="blue" />
                  <Button 
                  name={item.id}
                  loading={submitting && target === item.id} 
                  onClick={(e) => {
                    handleACtivityDelete(e, item.id);
                  }} floated="right" content="Delete" color="red" />
                  <Label basic content={item.category} />
                </Item.Extra>
              </Item.Content>
            </Item>
          )
        })
        }
      </Item.Group>
    </Segment>
  )
}

export default ActivityList