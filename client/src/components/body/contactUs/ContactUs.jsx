import React from "react";

const ContactUs = () => {
  return (
    <>
      <div className="contactus-main">
        <>
          <div className="container-fluid contact_div bg-white bg-gradient mb-5 my-4 mb-5 ">
            <div className="row">
              <div className="col-md-5 col-10 mx-auto border rounded px-5">
                <div className="row">
                  <div className="col-md-12 ">
                    <div className="mb-2 mt-3 py-3">
                      <h3 className="text-center">CONTACT US</h3>
                    </div>

                    <form action="" method="POST">
                      <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">
                          Full Name*
                        </label>
                        <input
                          name="name" 
                          type="text"
                          className="form-control"
                          id="fullname"
                          placeholder="Enter your name"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          E-Mail*
                        </label>
                        <input
                          name="email" 
                          type="text"
                          className="form-control"
                          id="email"
                          placeholder="name@example.com"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="title" className="form-label">
                          Title*
                        </label>
                        <input
                          name="title" 
                          type="text"
                          class="form-control"
                          id="title"
                          placeholder=" Suggestion / Query"
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="textarea" className="form-label">
                          Description*
                        </label>
                        <textarea
                          name="description" 
                          className="form-control"
                          id="textarea"
                          rows="3"
                          required
                        ></textarea>
                      </div>

                      <div class="col-12 mb-3    ">
                        <button
                          className="btn btn-outline-primary"
                          type="submit"
                        >
                          Submit form
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      </div>
    </>
  );
};

export default ContactUs;
