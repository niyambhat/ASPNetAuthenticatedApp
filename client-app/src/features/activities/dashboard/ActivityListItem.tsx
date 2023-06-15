import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom';
import { Item, Button, Label, Segment, Icon } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';
import { ActivityContext } from '../../../ActivityContext';
import format from 'date-fns/format';

interface Props{
    activity:Activity
}

function ActivityListItem({activity}:Props) {
    const {handleDeleteActivity, submitting} = useContext(ActivityContext)
    const [target, setTarget] = useState('');
    const handleActivityDelete=(e:any ,id:string)=>{
    setTarget(e.target.name);
    handleDeleteActivity(id);
  }
  return (
    <>
    <Segment.Group>
        <Segment>
            <Item.Group>
                <Item>
                    <Item.Image size="tiny" circular src="/images/user.png"/>
                    <Item.Content>
                        <Item.Header as={Link} to={`/activities/${activity.id}`}>
                            {activity.title}
                        </Item.Header>
                        <Item.Description>Hosted by Bob</Item.Description>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
        <Segment>
            <span>
                <Icon name="clock"/>{activity.date}
                <Icon name="marker"/>{activity.venue}
            </span>
        </Segment>
        <Segment clearing>
            <span>{activity.description}</span>
            <Button as={Link}  color="teal" to={`/activities/${activity.id}`} floated="right" content="View"  />

        </Segment>
    </Segment.Group>
    </>

  )
}

export default ActivityListItem