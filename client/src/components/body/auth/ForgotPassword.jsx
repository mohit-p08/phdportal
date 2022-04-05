import React, { useState } from "react";
import axios from "axios";
import { isEmail } from "../../utils/validation/Validation";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  email: "",
  err: "",
  success: "",
};

const ForgotPassword = () => {
  const [data, setData] = useState(initialState);
  const { email, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async () => {
    if (!isEmail(email))
      return setData({
        ...data,
        err: "Please enter valid email!",
        success: "",
      });

    try {
      const res = await axios.post("/user/forgotpassword", { email });
      return setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      err.response.data.msg &&
        setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      <div className="forgotpassword-main m-5">
        <div className="card justify-content-center col-6 border-light ">
          <div className="card-header border-light ">
            <h3>Forgot Password</h3>
          </div>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <div className="card-body m-2">
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChangeInput}
              id="email"
              placeholder="Email"
              className="form-control"
            />
            <button onClick={handleSubmit} className="btn btn-primary mt-3">
              Send Password Reset Link
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
