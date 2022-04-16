import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  err: "",
  success: "",
};

function Signature(props) {
  const [state, setState] = useState("");
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;

  const [data, setData] = useState(initialState);
  const [sign, setSign] = useState(false);
  const { err, success } = data;

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const read = new FileReader();
      read.onload = () => {
        if (read.readyState == 2) {
          setState(read.result);
        }
      };
      read.readAsDataURL(e.target.files[0]);

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

      const res = await axios.post("/api/upload_sign", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      setSign(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const signPicture = (e) => {};

  props.getSignature(data, sign);

  return (
    <>
      <div className="sign-main m-4">
        <div class="card col-sm-6">
          <h4 class="card-header py-2">
            Upload Applicant Signature
            <span className="text-danger h6"> [JPG/JPEG format only]</span>
          </h4>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <div class="card-body ">
            <div className="row">
              <div className="col">
                <input
                  type="file"
                  name="file"
                  id=""
                  className="form-control"
                  accept=".jpg,.jpeg"
                  onChange={changeAvatar}
                />
              </div>
              <div className="col signPic">
                <img src={state} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signature;
