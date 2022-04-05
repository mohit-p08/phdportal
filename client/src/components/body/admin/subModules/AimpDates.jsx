import React from 'react'

function AimpDates() {
  return (
    <>
        {/* admin sets Important dates  */}
        <div className="admin-paymentInfo m-3">
          <div className="card">
            <h5 className="card-header">IMPORTANT DATES</h5>
            <div className="card-body ">
              <label htmlFor="" className="m-2 card-header">
                Start of online Application (Website Open) :
                <input type="date" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header">
              Last Date online Application (Website Closure) :
                <input type="date" name="" id="" className="form-control" />
              </label>
              <label htmlFor="" className="m-2 card-header">
              CDET (CHARUSAT DOCTERAL ENTRANCE TEST) :
                <input type="date" name="" id="" className="form-control" />
              </label>
              <>
              <label htmlFor="" className="m-2 card-header">
              Mode Of Exam :
                <select name="" id="" className="form-select">
                    <option value="">--Select--</option>
                    <option value="online">Online</option>
                    <option value="offline">Offline</option>
                    </select>
              </label>
            </>
            </div>
          </div>
        </div>
    </>
  )
}

export default AimpDates