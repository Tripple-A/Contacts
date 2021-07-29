import React from "react";

const List = ({ data }) => {
  console.log("data", data);
  return (
    <div>
      <h1>Our contact list</h1>
      {data.map((contact) => (
        <p key={contact.id}>
          {contact.first_name} {contact.last_name}
        </p>
      ))}
    </div>
  );
};

export default List;
