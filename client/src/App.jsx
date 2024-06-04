import './App.css'; // Import the CSS file for styling
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import ButtonAppBar from "./components/ButtonAppBar.jsx";
import { getUser } from "./slice/authSlice.js";
import { useLocation } from 'react-router-dom';

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
      <div className='hello'>
        <Outlet />
      </div>
  );
}

export default App;
