import React from "react";
import { useParams } from "react-router";

const Details = ({ getContact, location }) => {
  let { id } = useParams();

  const contact = location ? location.contact : getContact(id);
  return (
    <div className="mx-auto text-left d-flex">
      <div className="mx-auto">
        <h5> History</h5>
      </div>
      <div className="mx-auto">
        <h5>Contact Details</h5>
        <h6>First name: {contact.first_name} </h6>
        <h6>Last name: {contact.last_name} </h6>
        <h6>Email: {contact.email} </h6>
        <h6>Phone number: {contact.phone_number} </h6>
      </div>
    </div>
  );
};

export default Details;
