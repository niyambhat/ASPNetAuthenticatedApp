import React, { useEffect, useState } from 'react';
import "../App.css"
import axios from 'axios';
import { Button, Container, Header, List, ListItem } from 'semantic-ui-react'
import { Activity } from '../models/Activity';
import Navbar from './Navbar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from "uuid";
import agent from '../api/agent';
import Loading from './Loading';

function App() {
  


  return (
    <div className="App">
      <Navbar/>
      <Container style={{ marginTop: "7em" }}>
        <ActivityDashboard
        />
        
      </Container>
    </div>
  );
}

export default App;
