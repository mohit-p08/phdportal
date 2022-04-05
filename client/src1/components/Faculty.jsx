import React, { Component } from "react";
import "../CSS/faculty.css";
import ApplicantListF from "./faculty/ApplicantListF";
import InfoBanner from "./InfoBanner";

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

export class Faculty extends Component {
  render() {
    return (
      <>
        <div className="faculty-main"></div>

        {/* 4Type applcations Info */}
        <InfoBanner />

        {/* list of applications  */}
        <ApplicantListF />
      </>
    );
  }
}

export default Faculty;
