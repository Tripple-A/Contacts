import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSaveOrUpdateContact } from "../../hooks";
import Error from "../Notifications/error";

const Form = ({ current, hideForm, edit }) => {
  const [firstName, setFirstName] = useState(current?.first_name || "");
  const [lastName, setLastName] = useState(current?.last_name || "");
  const [email, setEmail] = useState(current?.email || "");
  const [phoneNumber, setPhoneNumber] = useState(current?.phone_number || "");
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
    switch (e.target.name) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "phoneNumber":
        setPhoneNumber(e.target.value);
        break;
      default:
        return null;
    }
    return null;
  };

  return (
    <div>
      {isSuccess && hideForm()}
      {isError && <Error data={error.response.data} />}
      <form className="row g-3 needs-validation" novalidate onSubmit={save}>
        <div className="form-group animate__animated animate__zoomIn form-row d-flex justify-content-around">
          <input
            id="firstName"
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
              // onClick={update}
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
