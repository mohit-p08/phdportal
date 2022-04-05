import React from "react";

function PaymentInfo() {
  return (
    <>
      {/* ------payment information------  */}
      <div className="payment-info m-4 ">
        <div class="card col-sm-5 col-xl-6">
          <h4 class="card-header py-2">Payment Information</h4>
          <div class="card-body">
            <div className="form-group my-1">
              Transaction Number :
              <input
                type="text"
                name=""
                id=""
                className="form-control"
                required
              />
            </div>
            <div className="form-group my-2">
              Transaction Date :
              <input
                type="date"
                name=""
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
                name=""
                id=""
                className="form-control"
                accept="image/*"
                required
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PaymentInfo;
