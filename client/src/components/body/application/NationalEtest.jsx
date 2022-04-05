import React, { useState } from "react";

function NationalEtest() {
  const [display, setDisplay] = useState("d-none");

  const noTable = () => {
    setDisplay("d-none");
  };

  const yesTable = () => {
    setDisplay("");
  };

  return (
    <>
      <div className="nationalEtest m-4">
        <div class="card col-sm-5 col-xl-12">
          <h4 class="card-header py-2">National Eligibilty Test</h4>
          <div class="card-body ">
            <div className="form-group">
              <div className="row">
                <label htmlFor="" className="rb me-5 h6">
                  {/* radio yes  */}
                  <input
                    type="radio"
                    name="NET"
                    id=""
                    className="m-2"
                    onClick={yesTable}
                  />
                  YES
                </label>
                <label htmlFor="" className="rb me-5 h6">
                  {/* radio NO  */}
                  <input
                    type="radio"
                    name="NET"
                    id=""
                    className="m-2"
                    defaultChecked="true"
                    onClick={noTable}
                  />
                  NO
                </label>
              </div>
            </div>

            {/* Table  */}
            <div className={`row p-2 nationalEtest-table ${display}`}>
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>Name Of Examination</th>
                    <th>Score/Percentile</th>
                    <th>Valid Period [If Applicable]</th>
                    <th>
                      Upload Score Card
                      <div className="text-danger">[JPG/JPEG format only]</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Name Of Examination"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Score/Percentile"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control"
                        placeholder="Valid Period"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name=""
                        id=""
                        className="form-control"
                        accept="image/*"
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

export default NationalEtest;
