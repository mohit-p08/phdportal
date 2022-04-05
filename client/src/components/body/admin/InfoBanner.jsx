import React from "react";
import "../CSS/infoBanner.css";

// application type
const aType = [
  {
    name: "Total Applications",
    digit: 47,
    colour: "info",
  },
  {
    name: "Pending Applications",
    digit: 30,
    colour: "warning",
  },
  {
    name: "Approve Applications",
    digit: 10,
    colour: "success",
  },
  {
    name: "Reject Applications",
    digit: 7,
    colour: "danger",
  },
];

const InfoBanner = () => {
  return (
    <>
      <div className="infoBanner-main">
        {/* 4Type applcations Info */}
        <div className="InfoApplications container bg-secondary bg-opacity-25 mt-3 px-5 py-3">
          <div className="row bg-white">
            {aType.map((value) => {
              return (
                <>
                  <div className="totalA col">
                    <div
                      class={`card border-${value.colour} rounded-pill border-bottom-0  p-2`}
                    >
                      <h1>{value.digit}</h1>
                    </div>
                    <div class={`text-${value.colour} text-center mt-1`}>
                      <h5>{value.name}</h5>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default InfoBanner;
