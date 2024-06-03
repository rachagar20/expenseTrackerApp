import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AppBar from "./components/ButtonAppBar";
import { getUser } from "./slice/authSlice.js";
import { useLocation } from 'react-router-dom';
import backgroundImage from '../public/Untitled.jpeg';

function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  // Check if the current route is '/login' or '/register'
  const isAuthPage = location.pathname === '/login' || location.pathname === '/register';

  async function fetchUser() {
    setIsLoading(true);
    const res = await fetch(`http://localhost:3000/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res)
    if (res.ok) {
      const user = await res.json();
      console.log(user)
      dispatch(getUser(user));
    }
    setIsLoading(false);
  }

  useEffect(() => {
    fetchUser();
  }, [token]);

  if (isLoading) {
    return <p>Loading ...</p>;
  }

  return (
    <div  className={isAuthPage ? 'background-image' : ''}>
      <AppBar />
      <Outlet />
    </div>
  );
}

export default App;