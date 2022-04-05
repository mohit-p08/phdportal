import React, { Component } from "react";
import "../css/application.css";
import AcademicRecord from "./AcademicRecord";
import NationalEtest from "./NationalEtest";
import PaymentInfo from "./PaymentInfo";
import PersonalDetail from "./PersonalDetail";
import PhdpName from "./PhdpName";
import PhdpType from "./PhdpType";
import Signature from "./Signature";

class Application extends Component {
  render() {
    return (
      <>
        <div className="application-main container p-5">
          {/* application form  */}
          <form action="" className="row">
            {/* ------payment information------  */}
            <PaymentInfo />

            {/* ------Ph.D Program Type------ */}
            <PhdpType />

            {/* ------phd program Name------  */}
            <PhdpName />

            {/* ------personal Details------  */}
            <PersonalDetail />

            {/* details of acedemic record  */}
            <AcademicRecord />

            {/* National Eligibility Test  */}
            <NationalEtest />

            {/* Upload Applicant Signature */}
            <Signature />

            {/* Declaration  */}
            <div className="declaration-main m-4">
              <div class="card col-sm-6 col-xl-12">
                <h4 class="card-header py-2">Declaration</h4>
                <div class="card-body ">
                  <div className="row ">
                    <div className="col-1 align-self-center ps-5">
                      <input type="radio" name="" id="" className="" />
                    </div>
                    <div className="col-11 h6">
                      I declare that all information provided by me in the
                      application is true to the best of my knowledge and
                      belief. I understand that i am liable for prosecution if
                      any of the information is found to be false at any time in
                      future.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <center>
              <button type="submit" className="btn btn-primary m-2 p-2">
                {" "}
                SAVE
              </button>
              <button type="submit" className="btn btn-success m-2 p-2">
                SUBMIT
              </button>
            </center>
          </form>
        </div>
      </>
    );
  }
}
export default Application;
