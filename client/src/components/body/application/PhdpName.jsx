import React, { useState } from "react";
import Select from "react-select";
import data from "./data.json";

function PhdpName(props) {
  const [faculty, setFaculty] = useState(null);
  const [dept, setDept] = useState(null);
  const [deptList, setDeptList] = useState([]);

  // handle change event of the Faculty dropdown
  const handleFacultyChange = (obj) => {
    setFaculty(obj);
    setDept(null);
    setDeptList(obj.department);
  };

  // handle change event of the language dropdown
  const handleDeptChange = (obj) => {
    setDept(obj);
  };

  props.getPhdName(faculty, dept);

  return (
    <>
      {/* ------phd program Name------  */}
      <div className="phd-program m-4">
        <div class="card col-sm-5 col-xl-6">
          <h4 class="card-header py-2">Ph.D Program</h4>
          <div class="card-body ">
            <div className="form-group">
              {/* Main Dropdown List  */}
              <Select
                placeholder="--Select Faculty of PhD Program--"
                value={faculty}
                options={data}
                onChange={handleFacultyChange}
                getOptionLabel={(x) => x.faculty}
                getOptionValue={(x) => x.faculty_code}
              />

              {/* Sub Dropdown List  */}
              <Select
                placeholder="-- Select Department for Ph.D Program--"
                value={dept}
                options={deptList}
                onChange={handleDeptChange}
                getOptionLabel={(x) => x.dept}
                getOptionValue={(x) => x.deptcode}
                className="mt-3"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PhdpName;
