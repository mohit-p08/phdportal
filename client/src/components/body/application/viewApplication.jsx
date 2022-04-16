import React, { useState } from "react";

const initialState = {
  err: "",
  success: "",
};

function ViewApplication() {
  const handleSubmit = async (e) => {
    e.preventDeafult();
    try {
    } catch (err) {}
  };
  return (
    <>
      <div className="viewApplication-main container mt-5">
        <center>
          <form onSubmit={handleSubmit}>
            <h4 className="m-2">
              Click on the button to view your application
              <button type="submit" className="btn btn-primary btn-lg m-1 px-4">
                VIEW <i class="bi bi-eye"></i>
              </button>
            </h4>
          </form>
        </center>
      </div>
    </>
  );
}

export default ViewApplication;
