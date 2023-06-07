import React from 'react'
import { Button, Card, Icon, Image } from 'semantic-ui-react'
import { Activity } from '../../../models/Activity'
// import music from "../../../Assets/music.jpg"
interface Props {
  activity: Activity,
  cancelSelectedActivity: () => void,
  openForm:(id:string) => void
}


function ActivityDetails({ activity, cancelSelectedActivity, openForm}: Props) {
  return (
    <Card fluid>
      <Image src={`/images/${activity.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activity.title}</Card.Header>
        <Card.Meta>
          <span className='date'>{activity.date}</span>
        </Card.Meta>
        <Card.Description>
          {activity.description}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
          <Button basic color="blue" onClick={()=>openForm(activity.id)} >Edit</Button>
          <Button onClick={() => {cancelSelectedActivity()}} basic color="grey">Cancel</Button>
        </Button.Group>
      </Card.Content>
    </Card>
  )
}

export default ActivityDetails