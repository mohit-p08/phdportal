import React from "react";
import { useState } from "react/cjs/react.development";

const ForgotPassword = () => {
  const [state, setState] = useState("");
  const [setPwd, setSetPwd] = useState("d-none");


  const resetPassword = () => {
    setState("d-none");
    setSetPwd("")
  };

  return (
    <>
      <div className="forgotpassword-main m-5">
        <div className="card justify-content-center col-6 border-light ">
          <div className="card-header border-light ">
            <h3>Reset Password</h3>
          </div>
          <div className="card-body m-2">
            <div className={`${setPwd}`}>
              <form action="">
                <input
                  type="text"
                  name=""
                  id=""
                  placeholder="New Password"
                  className="form-control my-2"
                />
                <input
                  type="password"
                  name=""
                  id=""
                  placeholder="Confirm Password"
                  className="form-control"
                />
                <button type="submit" className="btn btn-primary my-3">
                  Reset password
                </button>
              </form>
            </div>

            <div className={`${state}`}>
              <form action="">
                <input
                  type="email"
                  name=""
                  id=""
                  placeholder="Email"
                  className="form-control"
                />
                <button
                  type="submit"
                  className="btn btn-primary mt-3"
                  onClick={resetPassword}
                >
                  Send Password Reset Link
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
