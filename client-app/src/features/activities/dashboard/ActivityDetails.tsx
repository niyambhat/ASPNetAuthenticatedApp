import React, { useContext, useEffect, useState } from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import { Activity } from '../../../models/Activity';
import { ActivityContext } from '../../../ActivityContext';
import Loading from '../../../layout/Loading';

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
    <Card fluid>
      <Image src={`/images/${activityDetails?.category}.jpg`} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{activityDetails?.title}</Card.Header>
        <Card.Meta>
          <span className="date">{activityDetails?.date.split('T')[0]}</span>
        </Card.Meta>
        <Card.Description>{activityDetails?.description}</Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button.Group widths={2}>
        /manage/:id
          {/* <Button basic color="blue" onClick={() => handleFormOpen(activityDetails?.id)}>
            Edit
          </Button> */}
          <Button as={Link} to={`/manage/${id}`} basic color="blue" content="Edit"/>
          <Button as={Link} to="/activities" basic color="grey">
            Cancel
          </Button>
        </Button.Group>
      </Card.Content>
    </Card>
  );
}

export default ActivityDetails;
