import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";
import ActivityForm from "../features/activities/form/ActivityForm";
// import ActivityDetails from "../features/activities/dashboard/ActivityDetails";
import ActivityDetails from "../features/activities/details/ActivityDetails";
import LoginForm from "../features/users/LoginForm";

export const routes:RouteObject[]=[
{
    path:"/",
    element:<App/>,
    children:[
        {path:"/", element:<HomePage/>},
        {path:"/activities", element:<ActivityDashboard/>},
        {path:"/createActivity", element:<ActivityForm/>},
        {path:"/login", element:<LoginForm/>},
        {path:"/activities/:id", element:<ActivityDetails/>},
        {path:"/manage/:id", element:<ActivityForm/>},
    ]
}
]


export const router = createBrowserRouter(routes);