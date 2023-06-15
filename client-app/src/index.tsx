import React from 'react';
import ReactDOM from 'react-dom/client';
import "../src/layout/index.css"
import "react-calendar/dist/Calendar.css"
import "react-datepicker/dist/react-datepicker.css"
import reportWebVitals from './reportWebVitals';
import 'semantic-ui-css/semantic.min.css'
import { RouterProvider } from 'react-router';
import { router } from './router/Routes';
import { ActivityProvider } from './ActivityContext';
import { UserProvider } from './UserContext';


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <ActivityProvider>
    <UserProvider>
    <RouterProvider router={router} />
    </UserProvider>
  </ActivityProvider>
   
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
