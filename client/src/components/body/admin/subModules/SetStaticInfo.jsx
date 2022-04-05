import React from "react";
import AimpDates from "./AimpDates";
import ApaymentDetails from "./ApaymentDetails";

const SetStaticInfo = () => {
  return (
    <>
      <div className="setStaticInfo-main m-3">
        <form action="">
          {/* admin sets Important dates  */}
          <div className="">
            <AimpDates />
          </div>

          {/* admin sets payment information  */}
          <div className="">
            <ApaymentDetails />
          </div>

          <center>
          <button type="submit" className="btn btn-primary m-2 col-sm-">
              UPDATE
            </button>
            <button type="submit" className="btn btn-success m-2 col-sm-">
              SAVE
            </button>
          </center>
        </form>
      </div>
    </>
  );
};

export default SetStaticInfo;
