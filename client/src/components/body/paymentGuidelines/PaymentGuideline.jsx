import React from "react";
import { NavLink } from 'react-router-dom';

const PaymentGuideline = () => {
  return (
    <>
      <div class="container">
        <div class="row">
          <div class="col-sm">
            <table class="mt-5 table table-bordered">
              <thead>
                <tr>
                  <th scope="col"> <h5> PAYMENT DETAILS </h5> </th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">Application Fee:</th>
                  <td>1500/- INR</td>
                </tr>
                <tr>
                  <th scope="row">Bank A/c Number:</th>
                  <td>30875081005</td>
                </tr>
                <tr>
                  <th scope="row">Bank A/c Type</th>
                  <td>Current A/c</td>
                </tr>
                <tr>
                  <th scope="row">Bank A/c Name</th>
                  <td>Charotar University of Science &amp; Technology</td>
                </tr>

                <tr>
                  <th scope="row">Bank Branch CODE</th>
                  <td>10961</td>
                </tr>
                <tr>
                  <th scope="row">Bank MICR CODE: </th>
                  <td>388002502</td>
                </tr>
                <tr>
                  <th scope="row">Bank IFSC code: </th>
                  <td>SBIN0010961</td>
                </tr>
                <tr>
                  <th scope="row">Bank Branch Address</th>
                  <td>
                    Darshan Hostel, Changa-Valetla Road, Changa. Dist. Anand
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="row mt-3">
          <mark className="p-2">
            Please check the list of available areas under Faculty @{" "}
            <strong>
              <NavLink
                to="/howtoapply"
                class="text-decoration-none"
              >
                How To Apply Menu
              </NavLink>
            </strong>{" "}
            before payment. <b>Application fees once paid is non refundable.</b>
          </mark>
        </div>

      </div>
    </>
  );
};

export default PaymentGuideline;
