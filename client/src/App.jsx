import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import AppBar from "./components/ButtonAppBar";
import { getUser } from "./slice/authSlice.js";

function App() {
  const token = Cookies.get("token");
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

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
    <>
      <AppBar />
      <Outlet />
    </>
  );
}

export default App;