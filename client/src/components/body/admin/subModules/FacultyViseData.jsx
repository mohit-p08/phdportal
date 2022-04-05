import React from "react";

const FacultyViseData = () => {
  return (
    <>
      <div className="facultyViseData-main">
        <div className="container mt-3 ">
          <table className="table table-bordered facultyViseData-table">
            <thead>
              <tr>
                <th>#</th>
                <th>Name of Faculty Program</th>
                <th className="text-primary">Total</th>
                <th className="text-warning">Pending</th>
                <th className="text-success">Approved</th>
                <th className="text-danger">Rejected</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>1</th>
                <td>Faculty of Technology and Engineering</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <th>2</th>
                <td>Faculty of Computer Science &amp; Applications</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <th>3</th>
                <td>Faculty of Applied Science</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <th>4</th>
                <td>Faculty of Management Studies</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <th>5</th>
                <td>Faculty of Medical Science</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
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
                <th>6</th>
                <td>Faculty of Pharmacy</td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td>
                  <input
                    type="checkbox"
                    name=""
                    id=""
                    className="form-check-input"
                  />
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr></tr>
            </tfoot>
          </table>
          <div className="sendN">
            <button class="btn btn-primary ">Send Notification</button>
          </div>
          <hr />
          <div className="sendN">
            <button class="btn btn-primary ">E-mail Payment Sheet</button>
            <button class="btn btn-primary mx-2">E-mail Sign Sheet</button>
            <hr />
          </div>
        </div>
      </div>
    </>
  );
};

export default FacultyViseData;
