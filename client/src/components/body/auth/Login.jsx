import "../css/Login.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { dispatchLogin } from "../../../redux/actions/authAction";
import { useDispatch } from "react-redux";

const initialState = {
  email: "",
  password: "",
  err: "",
  success: "",
};

const Login = () => {
  const [user, setUser] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { email, password, err, success } = user;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/user/login", { email, password });
      // console.log(res);
      setUser({ ...user, err: "", success: res.data.msg });

      localStorage.setItem("firstLogin", true);

      dispatch(dispatchLogin());
      navigate("/application");
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div className="login-main">
        <div className="login-container p-3 m-2">
          <center className="text-secondary m-1">
            <h2>CHARUSAT</h2>
            <h3>PhD Admission Portal</h3>
          </center>

          {/* Login Form Division  */}

          <div className="login-form mt-4 p-3 container">
            <center className="m-1">
              <h3>LOGIN</h3>
            </center>
            <hr />
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <form onSubmit={handleSubmit}>
              {/* username  */}
              <div class="mb-3">
                <label for="username" class="form-label">
                  Username
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="username"
                  value={email}
                  name="email"
                  onChange={handleChangeInput}
                  placeholder="Username"
                  required
                  autofocus
                />
              </div>

              {/* password */}
              <div class="mb-3">
                <label for="password" class="form-label">
                  Password
                </label>
                <input
                  type="password"
                  class="form-control"
                  id="password"
                  value={password}
                  name="password"
                  onChange={handleChangeInput}
                  placeholder="Password"
                  required
                />
              </div>

              <center>
                <button type="submit" class="btn btn-primary mt-3 col-12">
                  Login
                </button>
                <div className="mt-2">
                  <Link exact to="/forgotpassword">
                    Forgot Password ?
                  </Link>
                </div>
                <div className="mt-2">
                  <Link exact to="/signup">
                    New User [Register Here!]
                  </Link>
                </div>
              </center>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
