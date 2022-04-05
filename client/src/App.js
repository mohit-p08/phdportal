import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/header/Navbar";
import Body from "./components/body/Body";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  dispatchLogin,
  fetchApplication,
  disptachGetApplication,
} from "./redux/actions/authAction";

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) {
      const getToken = async () => {
        const res = await axios.post("/user/refresh_token", null);
        dispatch({
          type: "GET_TOKEN",
          payload: res.data.access_token,
        });
      };
      getToken();
    }
  }, [auth.isLogged, dispatch]);

  useEffect(() => {
    if (token) {
      const getUser = () => {
        dispatch(dispatchLogin());

        return fetchApplication(token).then((res) => {
          dispatch(disptachGetApplication(res));
        });
      };
      getUser();
    }
  }, [token, dispatch]);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Body />
      </div>
    </Router>
  );
}

export default App;
