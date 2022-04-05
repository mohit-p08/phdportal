import React, { Component, useState } from "react";

function AcademicRecord() {
  const [newRow, setNewRow] = useState("d-none");

  const hideRow = () => {
    setNewRow("d-none");
  };

  const addRow = () => {
    setNewRow("");
  };

  return (
    <>
      <div className="academic-record m-4">
        <div class="card col-sm-5 col-xl-12">
          <h4 class="card-header py-2">Details of Academic Record</h4>
          <div class="card-body ">
            <div className="form-group">
              <div className="row">
                <label htmlFor="" className="rb me-5">
                  {/* radio > 60%  */}
                  <input
                    type="radio"
                    name="academic"
                    id=""
                    className="m-2"
                    defaultChecked="true"
                    onClick={hideRow}
                  />
                  Master Degree Compelted With &gt; 60%
                </label>
                <label htmlFor="" className="rb me-5">
                  {/* radio marksheet  */}
                  <input
                    type="radio"
                    name="academic"
                    id=""
                    className="m-2"
                    onClick={addRow}
                  />
                  Awaited For the Result [Upload last 3 semester Marksheets]
                </label>
              </div>
            </div>

            <div className="row p-2 academicRecord-table">
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>Qulifying Degree Name</th>
                    <th>University Name</th>
                    <th>Year of Passing</th>
                    <th>% or CGPA</th>
                    <th>
                      Upload Degree Certificate / Last 3 Year Marksheet{" "}
                      <div className="text-danger">[JPG/JPEG format only]</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* Table row1 for >60%  */}
                  {/* row 1 */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Qualifying Degree"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="University Name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Year Of Passing"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="% or CGPA"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name=""
                        id=""
                        className="form-control"
                        accept=".jpg,.jpeg"
                      />
                    </td>
                  </tr>

                  {/* include above and 2 more rows  */}

                  {/* row 2  */}
                  <tr className={`${newRow}`}>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Qualifying Degree"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="University Name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Year Of Passing"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="% or CGPA"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name=""
                        id=""
                        className="form-control"
                        accept=".jpg,.jpeg"
                      />
                    </td>
                  </tr>

                  {/* row 3  */}
                  <tr className={`${newRow}`}>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Qualifying Degree"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="University Name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Year Of Passing"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="% or CGPA"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name=""
                        id=""
                        className="form-control"
                        accept=".jpg,.jpeg"
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AcademicRecord;
