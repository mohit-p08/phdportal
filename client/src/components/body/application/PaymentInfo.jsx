import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  tId: "",
  tDate: "",
  err: "",
  success: "",
};

async function PaymentInfo(props) {
  const token = useSelector((state) => state.token);
  const user = useSelector((state) => state.user);
  console.log(user);

  const [data, setData] = useState(initialState);
  const { tId, tDate, err, success } = data;
  const [tImg, setTImg] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  // send data from child to parent
  props.getPaymentInfo(data, tImg);

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

      const res = await axios.post("/api/upload_payment", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      // console.log(res);
      setTImg(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      {/* ------payment information------  */}
      <div className="payment-info m-4 ">
        <div class="card col-sm-5 col-xl-6">
          <h4 class="card-header py-2">Payment Information</h4>
          {err && showErrMsg(err)}
          {success && showSuccessMsg(success)}
          <div class="card-body">
            <div className="form-group my-1">
              Transaction Number :
              <input
                type="number"
                name="tId"
                value={tId}
                onChange={handleChange}
                id=""
                className="form-control"
                required
              />
            </div>
            <div className="form-group my-2">
              Transaction Date :
              <input
                type="date"
                name="tDate"
                value={tDate}
                onChange={handleChange}
                id=""
                className="form-control"
                required
              />
            </div>
            <div className="form-group my-2">
              Amount :
              <input
                type="number"
                name=""
                id=""
                className="form-control"
                value="1500"
                disabled
              />
            </div>
            <div className="form-group my-2">
              Upload Payment Receipt :
              <span className="text-danger">[JPG/JPEG format only]</span>
              <input
                type="file"
                name="file"
                id=""
                onChange={changeAvatar}
                className="form-control"
                accept="image/*"
                required
              />
              {/* <div className="input-userprofile-img">
                <div class="profile-pic-div">
                  <img
                    src={avatar ? avatar : user.avatar}
                    alt=""
                    id="user-img"
                  />
                  <input
                    type="file"
                    name="file"
                    id="input-user-pic"
                    onChange={changeAvatar}
                  />
                  <label htmlFor="input-user-pic" id="upload-userpic">
                    PROFILE
                  </label>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentInfo;
