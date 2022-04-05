import React, { Component } from "react";

export class PersonalDetail extends Component {
  state = {
    profilepic:
      "https://png.pngitem.com/pimgs/s/522-5220445_anonymous-profile-grey-person-sticker-glitch-empty-profile.png",
  };

  imageHandler = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState == 2) {
        this.setState({ profilepic: reader.result });
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { profilepic } = this.state;
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
                        name=""
                        id=""
                        placeholder="NAME"
                        required
                      />
                      {/* profile picture input*/}
                      <h6 className="py-2 mt-2">Upload Profile Picture</h6>
                      <input
                        type="file"
                        className="form-control "
                        accept=".jpg,.jpeg"
                        onChange={this.imageHandler}
                      />
                    </div>
                    {/* show profile img  */}
                    <div className="col-sm-6">
                      <div className="upload-profile p-1">
                        <img src={profilepic} alt="" />
                      </div>
                    </div>
                  </div>

                  {/* Gender Division  */}
                  <div className="row">
                    <h6 className="mt-4">Gender</h6>
                    <div className="gender-btn form-group">
                      <label htmlFor="" className="rb">
                        <input type="radio" name="gender" id="" />
                        <span className="p-2 h6">MALE</span>
                      </label>
                      <label htmlFor="" className="rb">
                        <input type="radio" name="gender" id="" />
                        <span className="p-2 h6">FEMALE</span>
                      </label>
                      <label htmlFor="" className="rb">
                        <input type="radio" name="gender" id="" />
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
                      name=""
                      id=""
                      className="form-control my-2"
                      placeholder="Address Line 1"
                    />
                    <input
                      type="text"
                      name=""
                      id=""
                      className="form-control my-2"
                      placeholder="Address Line 2"
                    />
                    <div className="row">
                      <div className="col-xl-4">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control my-2 col-xl-6"
                          placeholder="City"
                        />
                      </div>
                      <div className="col-xl-4">
                        <input
                          type="text"
                          name=""
                          id=""
                          className="form-control my-2 col-6"
                          placeholder="Pincode"
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-xl-4">
                        <input
                          type="text"
                          name=""
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
                          placeholder="Contry"
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
}

export default PersonalDetail;
