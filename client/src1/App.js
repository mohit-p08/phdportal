import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css";
import Navbar from "./components/Navbar";
import ContactUs from "./components/ContactUs";
import ImpDates from "./components/ImpDates";
import Login from "./components/Login";
import { Route, Routes } from "react-router";
import HowToApply from "./components/HowToApply";
import PaymentGuideline from "./components/PaymentGuideline";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import Application from "./components/Application";
import Faculty from "./components/Faculty";
import Admin from "./components/Admin";
import TandC from "./components/application/TandC";
import SetStaticInfo from "./components/admin/SetStaticInfo";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route exact path="/contactus" element={<ContactUs />}></Route>
        <Route exact path="/impdates" element={<ImpDates />}></Route>
        <Route exact path="/login" element={<Login />}></Route>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/howtoapply" element={<HowToApply />}></Route>
        <Route
          exact
          path="/paymentguidelines"
          element={<PaymentGuideline />}
        ></Route>
        <Route exact path="/signup" element={<Signup />}></Route>
        <Route
          exact
          path="/forgotpassword"
          element={<ForgotPassword />}
        ></Route>
        <Route exact path="/application" element={<Application />}></Route>
        <Route exact path="/faculty" element={<Faculty />}></Route>
        <Route exact path="/admin" element={<Admin />}></Route>
        <Route exact path="/tc" element={<TandC />}></Route>
        <Route exact path="/set-info" element={<SetStaticInfo />}></Route>
      </Routes>
    </>
  );
}

export default App;
