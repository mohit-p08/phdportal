import React, { useState } from "react";
import "../css/application.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AcademicRecord from "./AcademicRecord";
import NationalEtest from "./NationalEtest";
import PaymentInfo from "./PaymentInfo";
import PersonalDetail from "./PersonalDetail";
import PhdpName from "./PhdpName";
import PhdpType from "./PhdpType";
import Signature from "./Signature";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";

const initialState = {
  err: "",
  success: "",
};

function Application() {
  const [tId, setTId] = useState(0);
  const [tDate, setDate] = useState(0);
  const [tImg, setTImg] = useState(0);
  const [phdType, setPhdType] = useState(0);
  const [facultyPhD, setFacultyPhD] = useState(0);
  const [deptPhD, setDeptPhD] = useState(0);
  const [name, setName] = useState(0);
  const [profile, setProfile] = useState(0);
  const [gender, setGender] = useState(0);
  const [address, setAddress] = useState(0);
  const [city, setCity] = useState(0);
  const [states, setState] = useState(0);
  const [pinCode, setPinCode] = useState(0);
  const [academics, setAcademic] = useState(0);
  const [degreeName, setDegreeName] = useState(0);
  const [universityName, setUniversityName] = useState(0);
  const [yearOfPassing, setYearOfPassing] = useState(0);
  const [score, setScore] = useState(0);
  const [proof, setProof] = useState(0);
  const [degreeName2, setDegreeName2] = useState(0);
  const [universityName2, setUniversityName2] = useState(0);
  const [yearOfPassing2, setYearOfPassing2] = useState(0);
  const [score2, setScore2] = useState(0);
  const [proof2, setProof2] = useState(0);
  const [degreeName3, setDegreeName3] = useState(0);
  const [universityName3, setUniversityName3] = useState(0);
  const [yearOfPassing3, setYearOfPassing3] = useState(0);
  const [score3, setScore3] = useState(0);
  const [proof3, setProof3] = useState(0);
  const [netExam, setNetExam] = useState(0);
  const [nameAsInExam, setNameAsInExam] = useState(0);
  const [scoreAsInExam, setScoreAsInExam] = useState(0);
  const [validity, setValidity] = useState(0);
  const [certificate, setCertificate] = useState(0);
  const [signature, setSignature] = useState(0);
  const [data, setData] = useState(initialState);
  const { err, success } = data;
  const navigate = useNavigate();
  const token = useSelector((state) => state.token);

  function getPaymentInfoDetails(data, tImg) {
    setTId(data.tId);
    setDate(data.tDate);
    setTImg(tImg);
  }
  function getPhdTypeDetails(phdType) {
    setPhdType(phdType);
  }
  function getPhdNameDetails(faculty, dept) {
    setFacultyPhD(faculty);
    setDeptPhD(dept);
  }
  function getPersonalDetails(data, profile) {
    setName(data.name);
    setProfile(profile);
    setGender(data.gender);
    setAddress(data.address);
    setCity(data.city);
    setState(data.states);
    setPinCode(data.pinCode);
  }
  function getAcademicRecordDetails(data, avatar, avatar2, avatar3) {
    setAcademic(data.academics);
    setDegreeName(data.degreeName);
    setUniversityName(data.universityName);
    setYearOfPassing(data.yearOfPassing);
    setScore(data.score);
    setProof(avatar);
    if (academics == 0) {
      setDegreeName2(data.degreeName2);
      setUniversityName2(data.universityName2);
      setYearOfPassing2(data.yearOfPassing2);
      setScore2(data.score2);
      setProof2(avatar2);
      setDegreeName3(data.degreeName3);
      setUniversityName3(data.universityName3);
      setYearOfPassing3(data.yearOfPassing3);
      setScore3(data.score3);
      setProof3(avatar3);
    }
  }
  function getNetExamDetails(data, avatar) {
    setNetExam(data.netExam);
    if (data.netExam == 1) {
      setNameAsInExam(data.nameAsInExam);
      setScoreAsInExam(data.scoreAsInExam);
      setValidity(data.validity);
      setCertificate(avatar);
    }
  }
  function getSignatureDetails(data, sign) {
    setSignature(sign);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      axios.post(
        "/application/",
        {
          tId,
          tDate,
          tImg,
          phdType,
          facultyPhD: facultyPhD.faculty,
          deptPhD: deptPhD.dept,
          name,
          profile,
          gender,
          address,
          city,
          states,
          pinCode,
          academics,
          degreeName,
          universityName,
          yearOfPassing,
          score,
          proof,
          degreeName2,
          universityName2,
          yearOfPassing2,
          score2,
          degreeName3,
          universityName3,
          yearOfPassing3,
          score3,
          proof2,
          proof3,
          netExam,
          nameAsInExam,
          scoreAsInExam,
          validity,
          certificate,
          signature,
          draft: 0,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({
        ...data,
        err: "",
        success: "Application Submitted Successfully :)",
      });

      navigate("/viewapplication");
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  const handleSave = (e) => {
    e.preventDefault();
    try {
      axios.post(
        "/application/",
        {
          tId,
          tDate,
          tImg,
          phdType,
          facultyPhD: facultyPhD.faculty,
          deptPhD: deptPhD.dept,
          name,
          profile,
          gender,
          address,
          city,
          states,
          pinCode,
          academics,
          degreeName,
          universityName,
          yearOfPassing,
          score,
          proof,
          degreeName2,
          universityName2,
          yearOfPassing2,
          score2,
          degreeName3,
          universityName3,
          yearOfPassing3,
          score3,
          proof2,
          proof3,
          netExam,
          nameAsInExam,
          scoreAsInExam,
          validity,
          certificate,
          signature,
          draft: 1,
        },
        {
          headers: { Authorization: token },
        }
      );

      setData({
        ...data,
        err: "",
        success: "Application Saved Successfully :)",
      });

      navigate("/");
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

  return (
    <>
      {err && showErrMsg(err)}
      {success && showSuccessMsg(success)}
      <div className="application-main container p-5">
        {/* application form  */}
        <form className="row" onSubmit={handleSubmit}>
          {/* ------payment information------  */}
          {/* <PaymentInfo /> */}
          <PaymentInfo getPaymentInfo={getPaymentInfoDetails} />

          {/* ------Ph.D Program Type------ */}
          <PhdpType getPhdType={getPhdTypeDetails} />
          {/* ------phd program Name------  */}
          <PhdpName getPhdName={getPhdNameDetails} />
          {/* ------personal Details------  */}
          <PersonalDetail getPersonal={getPersonalDetails} />
          {/* details of acedemic record  */}
          <AcademicRecord getAcademicRecord={getAcademicRecordDetails} />
          {/* National Eligibility Test  */}
          <NationalEtest getNetExam={getNetExamDetails} />
          {/* Upload Applicant Signature */}
          <Signature getSignature={getSignatureDetails} />
          {/* Declaration  */}
          <div className="declaration-main m-4">
            <div class="card col-sm-6 col-xl-12">
              <h4 class="card-header py-2">Declaration</h4>
              <div class="card-body ">
                <div className="row ">
                  <div className="col-1 align-self-center ps-5">
                    <input type="radio" name="" id="" className="" />
                  </div>
                  <div className="col-11 h6">
                    I declare that all information provided by me in the
                    application is true to the best of my knowledge and belief.
                    I understand that i am liable for prosecution if any of the
                    information is found to be false at any time in future.
                  </div>
                </div>
              </div>
            </div>
          </div>
          <center>
            <button
              className="btn btn-primary m-2 p-2"
              onClick={handleSave}
              disabled
            >
              {" "}
              SAVE
            </button>
            <button type="submit" className="btn btn-success m-2 p-2">
              SUBMIT
            </button>
          </center>
        </form>
      </div>
    </>
  );
}

export default Application;
