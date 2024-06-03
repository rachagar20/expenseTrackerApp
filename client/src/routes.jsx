import React from 'react'
import App from "./App.jsx"
import Home from './pages/Home.jsx'
import Login from "./pages/Login.jsx"
import Guest from "./utils/Guest.jsx"
import RegisterUser from "./pages/RegisterUser.jsx"
import CheckAuth from "./utils/CheckAuth.jsx"
import Category from './pages/Category.jsx'
import {createBrowserRouter,Navigate} from "react-router-dom"
import Cookies from "js-cookie"
import Chart from './pages/Chart.jsx'
const token=Cookies.get("token")
console.log(token)
const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
            path: "/",
            element:<CheckAuth>
              <Home/>
            </CheckAuth>
        },
        {
          path:"/login",
          element: <Guest><Login/></Guest>
        },{
            path:"/register",
            element: <Guest><RegisterUser/></Guest>
        },{
          path:"/category",
          element:<CheckAuth><Category/></CheckAuth>
        },{
          path:"/analysis",
          element:<CheckAuth><Chart/></CheckAuth>
        }
      ]
    },
]);

export default router