import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import ActivationEmail from "./auth/ActivationEmail";
import Admin from "./admin/Admin";
import Application from "./application/Application";
import ContactUs from "./contactUs/ContactUs";
import Faculty from "./faculty/Faculty";
import ForgotPassword from "./auth/ForgotPassword";
import HowToApply from "./howToApply/HowToApply";
import ImpDates from "./impDates/ImpDates";
import Login from "./auth/Login";
import NotFound from "../utils/notFound/NotFound";
import PaymentGuideline from "./paymentGuidelines/PaymentGuideline";
import ResetPassword from "./auth/ResetPassword";
import Signup from "./auth/Signup";
import TandC from "./application/TandC";
import ViewApplication from "./application/viewApplication";

import "../../../node_modules/bootstrap/dist/css/bootstrap.css";
import "../../../node_modules/bootstrap/dist/js/bootstrap.bundle";
import "../../../node_modules/bootstrap-icons/font/bootstrap-icons.css";

function Body() {
  const auth = useSelector((state) => state.auth);
  const { isLogged } = auth;

  return (
    <section>
      <Routes>
        <Route path="/" element={<NotFound />} exact />
        {/* Not found - add one button to redirect it to the page according to it's application status */}
        <Route
          path="/user/activate/:activation_token"
          element={<ActivationEmail />}
          exact
        />
        <Route
          path="/admin"
          element={<Admin />}
          exact
          // isAdmin validation remaining
        />
        <Route
          path="/application"
          element={isLogged ? <Application /> : <Login />}
          exact
        />
        <Route path="/contactus" element={<ContactUs />} exact />
        {/* isDean validation remaining */}
        <Route path="/dean" element={<Faculty />} exact />
        <Route path="/forgotpassword" element={<ForgotPassword />} exact />
        <Route path="/howtoapply" element={<HowToApply />} exact />
        <Route path="/impdates" element={<ImpDates />} exact />
        <Route
          path="/login"
          element={isLogged ? <NotFound /> : <Login />}
          exact
        />
        <Route path="/paymentguidelines" element={<PaymentGuideline />} exact />
        <Route path="/TandC" element={isLogged ? <TandC /> : <Login />} exact />
        <Route
          path="/user/resetpassword/:token"
          element={<ResetPassword />}
          exact
        />
        <Route path="/signup" element={<Signup />} exact />
        <Route
          path="/viewapplication"
          element={isLogged ? <ViewApplication /> : <Login />}
          exact
        />
      </Routes>
    </section>
  );
}

export default Body;
