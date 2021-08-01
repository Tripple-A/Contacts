import React, { useState } from "react";
import PropTypes from "prop-types";
import Error from "../Notifications/error";

const Form = ({ current, hideForm, edit, saveContact }) => {
  const [details, setDetails] = useState({
    firstName: current?.first_name || "",
    lastName: current?.last_name || "",
    email: current?.email || "",
    phoneNumber: current?.phone_number || "",
  });
  const { firstName, lastName, email, phoneNumber } = details;
  const { isSuccess, isError, error, mutate } = saveContact;

  const save = (e) => {
    e.preventDefault();
    const data = {
      id: current?.id,
      first_name: firstName,
      last_name: lastName,
      email,
      phone_number: phoneNumber,
    };
    mutate(data);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  return (
    <div>
      {isSuccess && hideForm()}
      {isError && <Error data={error.response.data} />}
      <form className="row g-3 needs-validation" novalidate onSubmit={save}>
        <div className="form-group animate__animated animate__zoomIn form-row d-flex justify-content-around">
          <input
            id="firstName"
            data-testid="firstname-field"
            name="firstName"
            placeholder="First name"
            className="form-control"
            type="text"
            value={firstName}
            onChange={(e) => handleChange(e)}
            minLength="3"
            maxLength="25"
            required
          />
          <input
            id="lastName"
            data-testid="lastname-field"
            name="lastName"
            placeholder="Last name"
            className="form-control"
            type="text"
            value={lastName}
            onChange={(e) => handleChange(e)}
            minLength="3"
            maxLength="25"
            required
          />
          <input
            id="email"
            data-testid="email-field"
            className="form-control"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            required
          />
          <input
            id="phoneNumber"
            data-testid="phone-field"
            className="form-control"
            type="tel"
            placeholder="Phone number"
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange}
            required
          />
          <button
            className="mr-2 btn btn-primary mt-2"
            type="submit"
            data-testid="save-button"
          >
            {edit ? "Update" : "Save"}
          </button>
          <button
            className="btn btn-primary mt-2"
            type="button"
            onClick={hideForm}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
