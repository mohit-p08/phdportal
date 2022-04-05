import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
        <div className="container-fluid">
          <NavLink className="navbar-brand" to="/">
            <b> CHARUSAT | PhD Addmission </b>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              {/* <li className="nav-item">
                <a className="nav-link active" aria-current="page" to="#">
                  Home
                </a>
              </li> */}

              <li className="nav-item">
                <NavLink className="nav-link" exact to="/set-info">
                  Set-Info
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" exact to="/impdates">
                  Important Dates
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" exact to="/paymentguidelines">
                  Payment Guideline
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" exact to="/howtoapply">
                  How To Apply ?
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" exact to="/contactus">
                  Contact Us
                </NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link" exact to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
