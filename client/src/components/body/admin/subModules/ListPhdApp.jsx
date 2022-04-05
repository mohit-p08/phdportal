import React from "react";

const ListPhdApp = () => {
  return (
    <>
      <div className="listPhdApp-main m-3">
        <div className="container">
          <div className="card">
            <h5 className="card-header text-center">List PhD Applications</h5>
            <div className="card-body">
              <table className="table text-center">
                <thead>
                  <tr>
                    <th>Application-ID</th>
                    <th>Application Name</th>
                    <th>Degree Status</th>
                    <th>NET Exam Status</th>
                    <th>View Application</th>
                    <th>Approved</th>
                  </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>
                          <button className="btn btn-primary"><i class="bi bi-eye"></i> VIEW</button>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListPhdApp;
