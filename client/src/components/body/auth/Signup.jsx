import React, { useState } from "react";
import "../css/signup.css";
import { NavLink } from "react-router-dom";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import {
  isEmpty,
  isEmail,
  isLength,
  isMatch,
} from "../../utils/validation/Validation";

const initialState = {
  name: "",
  email: "",
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const Signup = () => {
  const [user, setUser] = useState(initialState);

  const { name, email, password, cf_password, err, success } = user;

  function refreshPage() {
    window.location.reload(false);
  }

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(password))
      return setUser({
        ...user,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setUser({ ...user, err: "Invalid email. Try again", success: "" });

    if (isLength(password))
      return setUser({
        ...user,
        err: "Password must be at least 6 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setUser({ ...user, err: "Password did not match.", success: "" });

    try {
      const res = await axios.post("/user/register", {
        name,
        email,
        password,
      });
      // console.log(res);
      setUser({ ...user, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setUser({ ...user, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div className="signup-main p-3">
        <div className="signup-container">
          {/* <center className="text-secondary">
            <h2>CHARUSAT</h2>
            <h3>PhD Admission Portal</h3>
          </center> */}

          <div className="signup-form container col-12 p-4">
            <center className="m-1">
              <h3>Create An Account</h3>
            </center>
            <hr />
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

            <form onSubmit={handleSubmit}>
              {/* Username  */}
              {/* <div class="form-group mb-2 mt-4">
                <label for="username" class="sr-only">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  class="form-control"
                  placeholder="Username"
                  required
                  autofocus
                />
                <sub class="text-danger"></sub>
              </div> */}

              {/* Email Address  */}
              <div class="form-group my-2">
                <label for="email" class="sr-only">
                  Email address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={handleChangeInput}
                  class="form-control"
                  placeholder="Email address"
                  required
                  autofocus
                />
                <sub class="text-danger"></sub>
              </div>

              {/* Name  */}
              <div class="form-group my-2">
                <label for="mobile" class="sr-only">
                  Name
                </label>
                <input
                  type="text"
                  id="mobile"
                  name="name"
                  value={name}
                  onChange={handleChangeInput}
                  class="form-control"
                  placeholder="Name"
                  required
                  autofocus
                />
                <sub class="text-danger"></sub>
              </div>

              {/* Password  */}
              <div class="form-group my-2">
                <label for="password" class="sr-only">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={password}
                  onChange={handleChangeInput}
                  class="form-control"
                  placeholder="Password"
                  required
                />
              </div>

              {/* confirm password */}
              <div class="form-group mt-2 mb-3">
                <label for="confirmpassword" class="sr-only">
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmpassword"
                  name="cf_password"
                  value={cf_password}
                  onChange={handleChangeInput}
                  class="form-control"
                  placeholder="Confirm Password"
                  required
                />
                <sub class="text-danger mb-4"></sub>
              </div>

              {/* Login Button  */}
              <center>
                <button type="submit" class="btn btn-primary mt-3 col-12">
                  Login
                </button>

                <div className="mt-3">
                  <NavLink exact to="/login">
                    Already registered [Login Here!]
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

export default Signup;
