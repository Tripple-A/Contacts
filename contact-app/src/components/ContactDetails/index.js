import React, { useState } from "react";
import { useParams } from "react-router";
import PropTypes from "prop-types";
import {
  useDeleteContact,
  useFetchHistory,
  useUpdateContact,
} from "../../hooks";
import Spinner from "react-bootstrap/Spinner";
import { Link, Redirect } from "react-router-dom";
import { dateSeparator, updates } from "../../helpers";
import Form from "../ContactForm";
import { Button } from "react-bootstrap";

const Details = ({ getContact }) => {
  const { id } = useParams();
  const contact = getContact(id);
  const [edit, setEdit] = useState(false);
  const showForm = () => setEdit(true);
  const hideForm = () => setEdit(false);
  const deleteContact = useDeleteContact();
  const updateContact = useUpdateContact();
  const { isLoading, error, data } = useFetchHistory(id);

  const doDelete = () => {
    const ans = window.confirm("Are you sure");
    if (ans) deleteContact.mutate(id);
  };

  if (!contact) {
    return (
      <div className="mx-auto text-center">
        <Link to="/">Home</Link>
        <h3>No such contact exists</h3>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="text-center">
        <Button onClick={showForm}>Edit</Button>
        <Button onClick={doDelete} className="m-2">
          Delete
        </Button>
        <Link to="/">Home</Link>
        {deleteContact.isSuccess && <Redirect to="/" />}
      </div>
      {edit && (
        <Form
          current={contact}
          hideForm={hideForm}
          edit
          saveContact={updateContact}
        />
      )}

      <div className="text-left d-flex">
        <div className="mx-auto p-2 text-center">
          <h5> Edit History</h5>
          {isLoading && <Spinner data-testid="spinner" animation="border" />}
          {error && <h3>There was an error loading the history</h3>}
          {data && (
            <div>
              {!data.length && <h6>No edit history yet</h6>}

              {data.map((audit) => (
                <div className="border-bottom">
                  {updates(audit.audited_changes)}
                  <p>Date: {dateSeparator(audit.created_at)}</p>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="mx-auto p-2">
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

Details.propTypes = {
  getContact: PropTypes.func,
};

export default Details;
