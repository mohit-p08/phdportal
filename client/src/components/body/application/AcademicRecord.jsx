import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  academics: "1",
  degreeName: "",
  universityName: "",
  yearOfPassing: "",
  score: "",
  degreeName2: "",
  universityName2: "",
  yearOfPassing2: "",
  score2: "",
  degreeName3: "",
  universityName3: "",
  yearOfPassing3: "",
  score3: "",
  err: "",
  success: "",
};

function AcademicRecord(props) {
  const [newRow, setNewRow] = useState("d-none");
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);

  const { user } = auth;

  const [data, setData] = useState(initialState);
  const {
    academics,
    degreeName,
    universityName,
    yearOfPassing,
    score,
    degreeName2,
    universityName2,
    yearOfPassing2,
    score2,
    degreeName3,
    universityName3,
    yearOfPassing3,
    score3,
    err,
    success,
  } = data;

  const [avatar, setAvatar] = useState(false);
  const [avatar2, setAvatar2] = useState(false);
  const [avatar3, setAvatar3] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  // for first image
  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/jpg")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload_degree", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      // console.log(res);
      setAvatar(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  // for second image
  const changeAvatar2 = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/jpg")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload_degree", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      // console.log(res);
      setAvatar2(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  // for third image
  const changeAvatar3 = async (e) => {
    e.preventDefault();
    try {
      const file = e.target.files[0];

      if (!file)
        return setData({
          ...data,
          err: "No files were uploaded.",
          success: "",
        });

      if (file.size > 1024 * 1024)
        return setData({ ...data, err: "Size too large.", success: "" });

      if (file.type !== "image/jpeg" && file.type !== "image/jpg")
        return setData({
          ...data,
          err: "File format is incorrect.",
          success: "",
        });

      let formData = new FormData();
      formData.append("file", file);

      const res = await axios.post("/api/upload_degree", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      // console.log(res);
      setAvatar3(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  // console.log(
  //   academics,
  //   degreeName,
  //   universityName,
  //   yearOfPassing,
  //   score,
  //   degreeName2,
  //   universityName2,
  //   yearOfPassing2,
  //   score2,
  //   degreeName3,
  //   universityName3,
  //   yearOfPassing3,
  //   score3
  // );

  // console.log(avatar, avatar2, avatar3);
  const hideRow = () => {
    setNewRow("d-none");
  };

  const addRow = () => {
    setNewRow("");
  };

  props.getAcademicRecord(data, avatar, avatar2, avatar3);

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
                    name="academics"
                    id=""
                    value="1"
                    className="m-2"
                    defaultChecked="true"
                    onClick={hideRow}
                    onChange={handleChange}
                  />
                  Master Degree Compelted With &gt; 60%
                </label>
                <label htmlFor="" className="rb me-5">
                  {/* radio marksheet  */}
                  <input
                    type="radio"
                    name="academics"
                    id=""
                    value="0"
                    className="m-2"
                    onClick={addRow}
                    onChange={handleChange}
                  />
                  Awaited For the Result [Upload last 3 semester Marksheets]
                </label>
              </div>
            </div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            <div className="row p-2 academicRecord-table">
              <table className="table-bordered">
                <thead>
                  <tr>
                    <th>Qualifying Degree Name</th>
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
                  {/* Table row1 for > 60% */}
                  {/* row 1 */}
                  <tr>
                    <td>
                      <input
                        type="text"
                        name="degreeName"
                        id=""
                        value={degreeName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Qualifying Degree"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="universityName"
                        id=""
                        value={universityName}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="University Name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="yearOfPassing"
                        id=""
                        value={yearOfPassing}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Year Of Passing"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="score"
                        id=""
                        value={score}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="% or CGPA"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name="file"
                        id=""
                        className="form-control"
                        accept=".jpg,.jpeg"
                        onChange={changeAvatar}
                      />
                    </td>
                  </tr>

                  {/* include above and 2 more rows  */}

                  {/* row 2  */}
                  <tr className={`${newRow}`}>
                    <td>
                      <input
                        type="text"
                        name="degreeName2"
                        id=""
                        value={degreeName2}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Qualifying Degree"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="universityName2"
                        id=""
                        value={universityName2}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="University Name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="yearOfPassing2"
                        id=""
                        value={yearOfPassing2}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Year Of Passing"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="score2"
                        id=""
                        value={score2}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="% or CGPA"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name="file2"
                        id=""
                        className="form-control"
                        accept=".jpg,.jpeg"
                        onChange={changeAvatar2}
                      />
                    </td>
                  </tr>

                  {/* row 3  */}
                  <tr className={`${newRow}`}>
                    <td>
                      <input
                        type="text"
                        name="degreeName3"
                        id=""
                        value={degreeName3}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Qualifying Degree"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="universityName3"
                        id=""
                        value={universityName3}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="University Name"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="yearOfPassing3"
                        id=""
                        value={yearOfPassing3}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Year Of Passing"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="score3"
                        id=""
                        value={score3}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="% or CGPA"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name="file3"
                        id=""
                        onChange={changeAvatar3}
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
