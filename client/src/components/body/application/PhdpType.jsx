import React, { useState } from "react";
import { useSelector } from "react-redux";

const initialState = {
  phdType: "",
};

function PhdpType(props) {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const { user } = auth;
  const [data, setData] = useState(initialState);
  const { phdType } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  props.getPhdType(phdType);

  // console.log(phdType);

  return (
    <>
      {/* ------Ph.D Program Type------ */}
      <div className="phd-type m-4 ">
        <div class="card col-sm-6 col-xl-6">
          <h4 class="card-header py-2">Ph.D Program Type</h4>
          <div class="card-body phdtype-body">
            {/* Phd Type radio button  */}
            <div className="form-group">
              <label htmlFor="" className="me-5 rb">
                <input
                  type="radio"
                  className="form-check-input mx-2"
                  name="phdType"
                  id=""
                  value="1"
                  onChange={handleChange}
                />
                <span className="h5">Full Time</span>
              </label>

              <label htmlFor="" className="ms-5 rb">
                <input
                  type="radio"
                  className="form-check-input mx-2"
                  name="phdType"
                  id=""
                  value="0"
                  onChange={handleChange}
                />
                <span className="h5">Part Time</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PhdpType;
