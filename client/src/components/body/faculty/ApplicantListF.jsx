import React, { Component } from "react";

export class ApplicantListF extends Component {
  render() {
    return (
      <>
        <div className="applicantListF mt-5">
          <form action="">
            <div className="container">
              <div className="card row">
                <h4 className="card-header">List of Ph.D Aplications</h4>
                <div className="card-body applicantListF-tbl">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Application-ID</th>
                        <th>Applicant-Name</th>
                        <th>Degree Status</th>
                        <th>NET Exam</th>
                        <th>View Application</th>
                        <th>View Appication Staus</th>
                        <th>Approve/Reject</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>1</td>
                        <td>Application-ID</td>
                        <td>Applicant-Name</td>
                        <td>Degree Status</td>
                        <td>NET Exam</td>
                        <td>View Application</td>
                        <td>View Appication Staus</td>
                        <td>
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="form-check-input"
                          />
                        </td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Application-ID</td>
                        <td>Applicant-Name</td>
                        <td>Degree Status</td>
                        <td>NET Exam</td>
                        <td>View Application</td>
                        <td>View Appication Staus</td>
                        <td>
                          <input
                            type="checkbox"
                            name=""
                            id=""
                            className="form-check-input "
                          />
                        </td>
                      </tr>
                    </tbody>
                    <tfoot>
                      <tr></tr>
                    </tfoot>
                  </table>
                  <div className="check-buttons ">
                    <button type="submit" className="btn btn-primary mx-2">
                      Verify &amp; approve
                    </button>
                    <button type="submit" className="btn btn-danger mx-2">
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default ApplicantListF;
