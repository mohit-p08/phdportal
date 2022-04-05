import React from "react";

function ApaymentDetails() {
  return (
    <>
      {/* admin sets payment information  */}
      <div className="admin-paymentdetails-main m-3">
        <div className="card ">
          <div className="">
            <h5 className="card-header">Payment Information</h5>
            <div className="card-body ">
              <label htmlFor="" className="m-2 card-header">
                Application Fee :
                <input type="number" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header">
                Bank Account Number :
                <input type="number" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header">
                Bank Account Type :
                <input type="text" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header">
                Bank Account Name :
                <input type="text" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header">
                Bank Branch Code :
                <input type="number" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header">
                Bank MICR Code :
                <input type="number" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header">
                Bank IFSC Code :
                <input type="text" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header col-4">
                Bank Branch Address :
                <input type="text" name="" id="" className="form-control" />
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApaymentDetails;
