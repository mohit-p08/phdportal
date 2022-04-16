import React, { useState } from "react";
import axios from "axios";
import {
  showErrMsg,
  showSuccessMsg,
} from "../../utils/notification/Notification";
import { isEmpty, isEmail } from "../../utils/validation/Validation";

const initialState = {
  name: "",
  email: "",
  title: "",
  description: "",
  err: "",
  success: "",
};

const ContactUs = () => {
  const [data, setData] = useState(initialState);
  const { name, email, title, description, err, success } = data;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({ ...data, [name]: value, err: "", success: "" });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      isEmpty(name) ||
      isEmpty(email) ||
      isEmpty(title) ||
      isEmpty(description)
    )
      return setData({
        ...data,
        err: "Please fill in all fields.",
        success: "",
      });

    if (!isEmail(email))
      return setData({ ...data, err: "Invalid email.", success: "" });

    try {
      const res = await axios.post("/contact", {
        name,
        email,
        title,
        description,
      });

      window.location.href = "/contactus";
      setData({ ...data, err: "", success: res.data.msg });
    } catch (err) {
      setData({ ...data, err: err.response.data.msg, success: "" });
    }
  };

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
                    {err && showErrMsg(err)}
                    {success && showSuccessMsg(success)}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="fullname" className="form-label">
                          Full Name*
                        </label>
                        <input
                          name="name"
                          value={name}
                          onChange={handleChange}
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
                          value={email}
                          onChange={handleChange}
                          type="email"
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
                          value={title}
                          onChange={handleChange}
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
                          value={description}
                          onChange={handleChange}
                          className="form-control"
                          id="textarea"
                          rows="3"
                          required
                        ></textarea>
                      </div>

                      <div class="col-12 mb-3">
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
