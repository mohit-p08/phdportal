import React from "react";
import "../css/admin.css";

import FacultyViseData from "./subModules/FacultyViseData";
import ListPhdApp from "./subModules/ListPhdApp";
import InfoBanner from "./InfoBanner";

const Admin = () => {
  return (
    <>
      <div className="admin-main">
        {/* 4Type application details  */}
        <InfoBanner />

        {/* faculty vise data  */}
        <FacultyViseData />

        {/* Ph.D program Dropdown  */}
        <center className="phdProgram-admin m-5">
          <div className="container">
            <div className="card col-sm-6">
              <h5 className="card-header">PhD Program</h5>

              <div className="card-body">
                <div className="form-group">
                  <select name="" id="" className="form-control">
                    <option value="">--Select Faculty for PhD Program--</option>
                    <option value="">
                      Faculty of Technology and Engineering
                    </option>
                    <option value="">
                      Faculty of Computer Science &amp; Applications
                    </option>
                    <option value="">Faculty of Applied Science</option>
                    <option value="">Faculty of Management Studies</option>
                    <option value="">Faculty of Medical Science</option>
                    <option value="">Faculty of Pharmacy</option>
                  </select>
                </div>

                {/* two buttons  */}
                <div className="viewApplication mt-3">
                  <button className="btn btn-primary m-2">
                    View All Applications
                  </button>
                  <button className="btn btn-primary m-2">
                    View Approved Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </center>

        {/* List of PhD Applications  */}
        <ListPhdApp />
      </div>
    </>
  );
};

export default Admin;
