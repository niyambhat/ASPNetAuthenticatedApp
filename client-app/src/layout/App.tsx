import React, { useContext, useEffect, useState } from 'react';
import "../App.css"
import axios from 'axios';
import { Button, Container, Header, List, ListItem } from 'semantic-ui-react'
import { Activity } from '../models/Activity';
import Navbar from './Navbar';
import ActivityDashboard from '../features/activities/dashboard/ActivityDashboard';
import {v4 as uuid} from "uuid";
import agent from '../api/agent';
import Loading from './Loading';
import { Outlet, useLocation } from 'react-router';
import { ActivityContext, ActivityProvider } from '../ActivityContext';
import HomePage from '../features/home/HomePage';
import { UserContext, UserProvider } from '../UserContext';

function App() {
const location = useLocation(); 
const {token} = useContext(UserContext);
  return (
    <div className="App">
      {location.pathname === "/" ? <HomePage/> :
      <>
      <Navbar/>
      <Container style={{ marginTop: "7em" }}>
        <Outlet/>
      </Container>
      </>
      }
    </div>
  );
}

export default App;
