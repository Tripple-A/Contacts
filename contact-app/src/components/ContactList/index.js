import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "../ContactForm";
import { useSaveContact } from "../../hooks";

const List = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  const saveContact = useSaveContact();
  return (
    <div className="mx-auto text-center container">
      <h1>Our contact list</h1>
      <Button
        onClick={() => setShowForm(true)}
        className="m-4"
        data-testid="addButton"
      >
        {" "}
        Add Contact
      </Button>
      {showForm && (
        <Form hideForm={() => setShowForm(false)} saveContact={saveContact} />
      )}

      <div>
        {data.map((contact) => (
          <Link
            to={{ pathname: `/contact/${contact.id}`, contact: contact }}
            key={contact.id}
          >
            <p data-testid="contact-name">
              {contact.first_name} {contact.last_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
