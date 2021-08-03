import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import Form from "../ContactForm";
import { useSaveContact } from "../../hooks";

const List = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const saveContact = useSaveContact();
  return (
    <div className="mx-auto text-center container">
      <h1>Our contact list</h1>
      <Button onClick={() => setShowForm(true)} className="m-4">
        {" "}
        Add Contact
      </Button>
      {showForm && (
        <Form hideForm={() => setShowForm(false)} saveContact={saveContact} />
      )}

      <div>
        {data.map((contact) => (
          <Link to={`/contact/${contact.id}`} key={contact.id}>
            <p data-testid="contact-name">
              {contact.first_name} {contact.last_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

List.propTypes = {
  data: PropTypes.array.isRequired,
};

export default List;
