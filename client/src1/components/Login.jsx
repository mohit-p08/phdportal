import React from "react";
import "../CSS/login.css";
import { NavLink } from "react-router-dom";

const Login = () => {
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
            <center className="m-1"><h3>LOGIN</h3></center>
            <hr />

            <form>
              {/* username  */}
              <div class="mb-3">
                <label for="username" class="form-label">
                  Username
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="username"
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
                  placeholder="Password"
                  required
                />
              </div>

              <center>
                <button type="submit" class="btn btn-primary mt-3 col-12">
                  Login
                </button>
                <div className="mt-2">
                  <NavLink exact to="/forgotpassword">
                    Forgot Password ?
                  </NavLink>
                </div>
                <div className="mt-2">
                  <NavLink exact to="/signup">
                    New User [Register Here!]
                  </NavLink>
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
