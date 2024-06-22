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
import LandingPage from './components/main/Landing.jsx'
import Chart from './pages/Chart.jsx'
import Dashboard from './pages/DashBoard'
import  ButtonAppBar  from './components/ButtonAppBar.jsx'
import AppBar from './components/AppBar.jsx'
const token=Cookies.get("token")
const router = createBrowserRouter([
    {
      element: <App />,
      children: [
        {
          path:"/",
          element:<LandingPage/>
        },
        {
            path: "/transaction",
            element:<CheckAuth>
              <ButtonAppBar><Home/></ButtonAppBar>
            </CheckAuth>
        },
        {
          path:"/dashboard",
          element:<CheckAuth><ButtonAppBar><Dashboard/></ButtonAppBar></CheckAuth>
        },
        {
          path:"/login",
          element: <Guest><AppBar/><Login/></Guest>
        },{
            path:"/register",
            element: <Guest><AppBar/><RegisterUser/></Guest>
        },{
          path:"/category",
          element:<CheckAuth><ButtonAppBar><Category/></ButtonAppBar></CheckAuth>
        },{
          path:"/analysis",
          element:<CheckAuth><ButtonAppBar><Chart/></ButtonAppBar></CheckAuth>
        }
      ]
    },
]);

export default router