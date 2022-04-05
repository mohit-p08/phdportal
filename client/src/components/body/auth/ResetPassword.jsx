import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { isLength, isMatch } from "../../utils/validation/Validation";

const initialState = {
  password: "",
  cf_password: "",
  err: "",
  success: "",
};

const ResetPassword = () => {
  const [data, setData] = useState(initialState);
  const { token } = useParams();

  const { password, cf_password, err, success } = data;

  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleResetPassword = async () => {
    if (isLength(password))
      return setData({
        ...data,
        err: "Password must be at least 8 characters.",
        success: "",
      });

    if (!isMatch(password, cf_password))
      return setData({
        ...data,
        err: "Passwords did not match.",
        success: "",
      });

    try {
      const res = await axios.post(
        "/user/resetpassword",
        { password },
        {
          headers: { Authorization: token },
        }
      );
      window.location.href = "/login";
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
            <h3>Reset Password</h3>
          </div>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <div className="card-body m-2">
            <input
              type="text"
              name="password"
              value={password}
              onChange={handleChangeInput}
              id=""
              placeholder="New Password"
              className="form-control my-2"
            />
            <input
              type="password"
              name="cf_password"
              value={cf_password}
              onChange={handleChangeInput}
              id=""
              placeholder="Confirm Password"
              className="form-control"
            />
            <button
              onClick={handleResetPassword}
              className="btn btn-primary my-3"
            >
              Reset password
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPassword;
