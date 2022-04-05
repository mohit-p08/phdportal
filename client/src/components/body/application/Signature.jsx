import React, { Component } from "react";

export class Signature extends Component {
  state = {
    signPic: "",
  };

  signPicture = (e) => {
    const read = new FileReader();
    read.onload = () => {
      if (read.readyState == 2) {
        this.setState({ signPic: read.result });
      }
    };
    read.readAsDataURL(e.target.files[0]);
  };

  render() {
    const { signPic } = this.state;
    return (
      <>
        <div className="sign-main m-4">
          <div class="card col-sm-6">
            <h4 class="card-header py-2">
              Upload Applicant Signature
              <span className="text-danger h6"> [JPG/JPEG format only]</span>
            </h4>
            <div class="card-body ">
              <div className="row">
                <div className="col">
                  <input
                    type="file"
                    name=""
                    id=""
                    className="form-control"
                    accept=".jpg,.jpeg"
                    onChange={this.signPicture}
                  />
                </div>
                <div className="col signPic">
                  <img src={signPic} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Signature;
