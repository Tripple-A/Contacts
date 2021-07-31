import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import Form from "../ContactForm";

const List = ({ data }) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="mx-auto text-center container">
      <h1>Our contact list</h1>
      <Button onClick={() => setShowForm(true)} className="m-4">
        {" "}
        Add Contact
      </Button>
      {showForm && <Form hideForm={() => setShowForm(false)} />}

      <div>
        {data.map((contact) => (
          <Link
            to={{ pathname: `/contact/${contact.id}`, contact: contact }}
            key={contact.id}
          >
            <p>
              {contact.first_name} {contact.last_name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default List;
