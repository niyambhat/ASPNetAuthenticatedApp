import React, { createContext, useState } from 'react';
import { Activity } from './models/Activity';
import agent from './api/agent';
import { v4 as uuid } from 'uuid';



interface IActivityContext {
    activities: Activity[];
    selectedActivity: Activity | undefined;
    editMode: boolean;
    loading: boolean;
    submitting: boolean;
    handleSelectActivity: (id: string) => void;
    handleCancelSelectActivity: () => void;
    handleFormOpen: (id?: string) => void;
    handleFormClose: () => void;
    handleCreateOrEditActivity: (activity: Activity) => void;
    handleDeleteActivity: (id: string) => void;
    setActivities: React.Dispatch<React.SetStateAction<Activity[]>>;
    setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  }
  const ActivityContext = createContext<IActivityContext>({} as IActivityContext);

const ActivityProvider = ({ children }: { children: React.ReactNode }) => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(activity => activity.id === id));
  };

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined);
  };
 
  const handleFormOpen = (id?: string) => {
    id ? handleSelectActivity(id) : handleCancelSelectActivity();
    setEditMode(true);
  };

  const handleFormClose = () => {
    setEditMode(false);
  };

  const handleCreateOrEditActivity = (activity: Activity) => {
    setSubmitting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([...activities.filter(x => x.id !== activity.id), activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, activity]);
        setEditMode(false);
        setSelectedActivity(activity);
        setSubmitting(false);
      });
    }
  };

  const handleDeleteActivity = (id: string) => {
    setSubmitting(true);
    agent.Activities.delete(id).then(() => {
      console.log('Success');
      setActivities([...activities.filter(x => x.id !== id)]);
      setSubmitting(false);
    });
  };


  

  const activityContextValue = {
    activities,
    selectedActivity,
    editMode,
    loading,
    submitting,
    setActivities,
    setLoading,
    handleSelectActivity,
    handleCancelSelectActivity,
    handleFormOpen,
    handleFormClose,
    handleCreateOrEditActivity,
    handleDeleteActivity
  };

  return (
    <ActivityContext.Provider value={activityContextValue}>
      {children}
    </ActivityContext.Provider>
  );
};


export { ActivityProvider, ActivityContext };
