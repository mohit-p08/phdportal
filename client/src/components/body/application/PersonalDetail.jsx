import React, { useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  name: "",
  gender: "",
  address: "",
  city: "",
  states: "",
  pinCode: "",
  err: "",
  success: "",
};

function PersonalDetail(props) {
  const auth = useSelector((state) => state.auth);
  const token = useSelector((state) => state.token);
  const { user } = auth;

  const [data, setData] = useState(initialState);
  const { name, gender, address, city, states, pinCode, err, success } = data;

  const [profile, setProfile] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const changeAvatar = async (e) => {
    e.preventDefault();
    try {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState == 2) {
          setState(reader.result);
        }
      };
      reader.readAsDataURL(e.target.files[0]);

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

      const res = await axios.post("/api/upload_avatar", formData, {
        headers: {
          "content-type": "multipart/form-data",
          Authorization: token,
        },
      });
      // console.log(res);
      setProfile(res.data.url);
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const [state, setState] = useState(
    "https://png.pngitem.com/pimgs/s/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png"
  );

  props.getPersonal(data, profile);

  return (
    <>
      <div className="personal-details m-4">
        <div class="card col-sm-5 col-xl-12">
          <h4 class="card-header py-2">Personal Details</h4>
          <div class="card-body">
            {/* note  */}
            <div className="alert-sm p-1 alert-danger m-0" role="alert">
              NOTE: Use CAPITAL letters only
            </div>
            {err && showErrMsg(err)}
            {success && showSuccessMsg(success)}
            {/* info  */}
            <div className="form-group my-1 col-sm-6 col-xl-auto">
              <div className="container-sm">
                <div className="row gx-5">
                  <div className="col-sm-6 ">
                    {/* Candidate Name  */}
                    <h6 className="py-2">
                      Candidate Name [As per Qualifying Degree Certificate]
                    </h6>
                    <input
                      type="text"
                      className="form-control "
                      name="name"
                      value={name}
                      onChange={handleChange}
                      id=""
                      placeholder="NAME"
                      required
                    />
                    {/* profile picture input*/}
                    <h6 className="py-2 mt-2">Upload Profile Picture</h6>
                    <input
                      type="file"
                      name="file"
                      className="form-control "
                      accept=".jpg,.jpeg, image/*"
                      onChange={changeAvatar}
                    />
                  </div>
                  {/* show profile img  */}
                  <div className="col-sm-6">
                    <div className="upload-profile p-1">
                      <img src={state} alt="" />
                    </div>
                  </div>
                </div>

                {/* Gender Division  */}
                <div className="row">
                  <h6 className="mt-4">Gender</h6>
                  <div className="gender-btn form-group">
                    <label htmlFor="" className="rb">
                      <input
                        type="radio"
                        name="gender"
                        id=""
                        value="MALE"
                        onChange={handleChange}
                      />
                      <span className="p-2 h6">MALE</span>
                    </label>
                    <label htmlFor="" className="rb">
                      <input type="radio" name="gender" id="" value="FEMALE" />
                      <span className="p-2 h6">FEMALE</span>
                    </label>
                    <label htmlFor="" className="rb">
                      <input
                        type="radio"
                        name="gender"
                        id=""
                        value="TRANSGENDER"
                      />
                      <span className="p-2 h6">TRANSGENDER</span>
                    </label>
                  </div>
                </div>
                <hr />
                {/* address details  */}
                <h5 className="p-2">Address Details*</h5>
                <div className="form-group">
                  <input
                    type="text"
                    name="address"
                    id=""
                    value={address}
                    onChange={handleChange}
                    className="form-control my-2"
                    placeholder="Address"
                  />
                  <div className="row">
                    <div className="col-xl-4">
                      <input
                        type="text"
                        name="city"
                        id=""
                        value={city}
                        onChange={handleChange}
                        className="form-control my-2 col-xl-6"
                        placeholder="City"
                      />
                    </div>
                    <div className="col-xl-4">
                      <input
                        type="text"
                        name="pinCode"
                        id=""
                        value={pinCode}
                        onChange={handleChange}
                        className="form-control my-2 col-6"
                        placeholder="Pincode"
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xl-4">
                      <input
                        type="text"
                        name="states"
                        value={states}
                        onChange={handleChange}
                        id=""
                        className="form-control my-2"
                        placeholder="State"
                      />
                    </div>
                    <div className="col-xl-4">
                      <input
                        type="text"
                        name=""
                        id=""
                        className="form-control my-2"
                        placeholder="Country"
                        value="INDIA"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PersonalDetail;
