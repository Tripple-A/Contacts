import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSaveOrUpdateContact } from "../../hooks";
import Error from "../Notifications/error";

const Form = ({ current, hideForm, edit }) => {
  const [details, setDetails] = useState({
    firstName: current?.first_name || "",
    lastName: current?.last_name || "",
    email: current?.email || "",
    phoneNumber: current?.phone_number || "",
  });
  const { firstName, lastName, email, phoneNumber } = details;
  const { isSuccess, isError, error, mutate } = useSaveOrUpdateContact(edit);

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
    console.log("in the form", e.target.value, e.target.name);
    setDetails((prevDetails) => {
      return { ...prevDetails, ...{ [e.target.name]: e.target.value } };
    });
  };

  return (
    <div>
      {isSuccess && hideForm()}
      {isError && <Error data={error.response.data} />}
      <form className="row g-3 needs-validation" novalidate onSubmit={save}>
        <div className="form-group animate__animated animate__zoomIn form-row d-flex justify-content-around">
          <label htmlFor="firstName">first name </label>
          <input
            id="firstName"
            data-testid="firstname-field"
            name="firstName"
            placeholder="First name"
            className="form-control"
            type="text"
            defaultValue={firstName}
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
            defaultValue={lastName}
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
          {edit ? (
            <button
              className="mr-2 btn btn-primary mt-2"
              type="submit"
              data-testid="saveButton"
            >
              Update
            </button>
          ) : (
            <button
              className="mr-2 btn btn-primary mt-2"
              type="submit"
              data-testid="updateButton"
            >
              Save
            </button>
          )}
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
