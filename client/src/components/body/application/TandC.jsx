import HowToApply from "../HowToApply";
import React from "react";

const TandC = () => {
  return (
    <>
      <div className="tc-main container">
        <div className=" card p-2 border-0 m-3">
          <h4 className="card-header">Terms &amp; Conditions </h4>
          <div className="card-body">
            <HowToApply />
          </div>
          <hr />
          <form action="">
            <div className="tc-input-div px-2">
              <div className="form-check">
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="form-check-input"
                />
                <h6 htmlFor="" className="form-check-label">
                  I AGREE, All above Terms and Conditions.
                </h6>
              </div>
              <button type="submit" className="btn btn-success my-3 col-2">
                CONFIRM
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default TandC;
