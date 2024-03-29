import React from 'react'
import { Segment, Item, Header, Button, Image } from 'semantic-ui-react';
import { Activity } from '../../../models/Activity';

interface Props {
    activity: Activity | null;
  }

const activityImageStyle = {
    filter: 'brightness(30%)'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};


function ActivityDetailedHeader({activity}:Props) {
  return (

    <Segment.Group>
    <Segment basic attached='top' style={{padding: '0'}}>
        <Image src={`/images/${activity?.category}.jpg`} fluid style={activityImageStyle}/>
        <Segment style={activityImageTextStyle} basic>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Header
                            size='huge'
                            content={activity?.title}
                            style={{color: 'white'}}
                        />
                        <p>{activity?.date}</p>
                        <p>
                            Hosted by <strong>Bob</strong>
                        </p>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    </Segment>
    <Segment clearing attached='bottom'>
        <Button color='teal'>Join Activity</Button>
        <Button>Cancel attendance</Button>
        <Button color='orange' floated='right'>
            Manage Event
        </Button>
    </Segment>
</Segment.Group>
  )
}

export default ActivityDetailedHeader