import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  netExam: "0",
  nameAsInExam: "",
  scoreAsInExam: "",
  validity: "",
  err: "",
  success: "",
};

function NationalEtest(props) {
  const [display, setDisplay] = useState("d-none");
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;

  const [data, setData] = useState(initialState);
  const { netExam, nameAsInExam, scoreAsInExam, validity, err, success } = data;

  const [avatar, setAvatar] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

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

      const res = await axios.post("/api/upload_academic", formData, {
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

  // console.log(netExam, nameAsInExam, scoreAsInExam, validity, avatar);
  props.getNetExam(data, avatar);

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
                    name="netExam"
                    id=""
                    value="1"
                    onChange={handleChange}
                    className="m-2"
                    onClick={yesTable}
                  />
                  YES
                </label>
                <label htmlFor="" className="rb me-5 h6">
                  {/* radio NO  */}
                  <input
                    type="radio"
                    name="netExam"
                    id=""
                    value="0"
                    onChange={handleChange}
                    className="m-2"
                    defaultChecked="true"
                    onClick={noTable}
                  />
                  NO
                </label>
              </div>
            </div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}

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
                        name="nameAsInExam"
                        id=""
                        value={nameAsInExam}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Name Of Examination"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="scoreAsInExam"
                        id=""
                        value={scoreAsInExam}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Score/Percentile"
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        name="validity"
                        id=""
                        value={validity}
                        onChange={handleChange}
                        className="form-control"
                        placeholder="Valid Period"
                      />
                    </td>
                    <td>
                      <input
                        type="file"
                        name="file"
                        id=""
                        onChange={changeAvatar}
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
