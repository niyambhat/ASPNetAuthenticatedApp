import { createBrowserRouter, RouteObject } from "react-router-dom";
import App from "../layout/App";
import HomePage from "../features/home/HomePage";
import ActivityDashboard from "../features/activities/dashboard/ActivityDashboard";

export const routes:RouteObject[]=[
{
    path:"/",
    element:<App/>,
    children:[
        {path:"", element:<HomePage/>},
        {path:"createActivity", element:""},

    ]
}
]


export const router = createBrowserRouter(routes);