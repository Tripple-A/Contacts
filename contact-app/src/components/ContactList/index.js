import React from "react";
import { Link } from "react-router-dom";

const List = ({ data }) => {
  return (
    <div className="mx-auto text-center">
      <h1>Our contact list</h1>
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
