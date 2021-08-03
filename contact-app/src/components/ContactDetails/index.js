import React, { useState } from "react";
import { useParams } from "react-router";
import {
  useDeleteContact,
  useFetchHistory,
  useUpdateContact,
} from "../../hooks";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect } from "react-router-dom";
import Form from "../ContactForm";

const Details = ({ getContact, location }) => {
  const { id } = useParams();
  const [edit, setEdit] = useState(false);
  const showForm = () => setEdit(true);
  const hideForm = () => setEdit(false);
  const contact = location ? location.contact : getContact(id);
  const { isSuccess, mutate } = useDeleteContact();
  const saveContact = useUpdateContact();
  const { isLoading, error, data } = useFetchHistory(id);
  const dateSeperator = (date) => {
    const editDate = date.split(/[\TZ,]+/);
    return `${editDate[0]} at ${editDate[1]}`;
  };

  const updates = (audit) => {
    return Object.entries(audit).map(([key, value]) => {
      return (
        <div>
          <p>
            {key}: From {value[0]} to {value[1]}
          </p>
        </div>
      );
    });
  };

  const deleteContact = () => {
    const ans = window.confirm("Are you sure");
    if (ans) mutate(id);
  };

  if (!contact) {
    return <div>No such contact exists</div>;
  }

  return (
    <div className="container">
      <div className="text-center">
        <button onClick={showForm}>Edit</button>
        <button onClick={deleteContact}>Delete</button>
        <Link to="/">Home</Link>
        {isSuccess && <Redirect to="/" />}
      </div>
      {edit && (
        <Form
          current={contact}
          hideForm={hideForm}
          edit
          saveContact={saveContact}
        />
      )}

      <div className="text-left d-flex">
        <div className="mx-auto" style={{ border: "1px solid black" }}>
          <h5> Edit History</h5>
          {isLoading && <Spinner animation="border" />}
          {error && <h3>There was an error loading the history</h3>}
          {data && (
            <div>
              {!data.length && <h6>No edit history yet</h6>}

              {data.map((audit) => (
                <div>
                  {updates(audit.audited_changes)}
                  <p>Date: {dateSeperator(audit.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mx-auto">
          <h5>Contact Details</h5>
          <h6>First name: {contact.first_name} </h6>
          <h6>Last name: {contact.last_name} </h6>
          <h6>Email: {contact.email} </h6>
          <h6>Phone number: {contact.phone_number} </h6>
        </div>
      </div>
    </div>
  );
};

export default Details;
