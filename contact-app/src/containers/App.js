import { useState } from "react";
import { useFetchContacts } from "../hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Form from "../components/ContactForm";
import List from "../components/ContactList";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Details from "../components/ContactDetails";

const App = () => {
  const [showForm, setShowForm] = useState(false);
  const hideForm = () => setShowForm(false);
  const { isLoading, error, data } = useFetchContacts();
  const getContact = (id) => {
    let contacts = data.data;
    return contacts.find((contact) => id == contact.id);
  };

  return (
    <Router>
      <div className="container">
        <div className="jumbotron jumbotron-fluid bg-dark text-white mb-3">
          <div className="container d-flex">
            <h1 className="display-4">Contact Application</h1>
            <p className="lead">
              Store, modify, delete and view the edit history of your contacts.{" "}
            </p>
            <Button onClick={() => setShowForm(true)} className="m-4">
              {" "}
              Add Contact
            </Button>
          </div>
        </div>
        {showForm && <Form hideForm={hideForm} />}
        <div className="mx-auto text-center">
          {error && <h3>There was an error loading the contacts</h3>}
          {isLoading && <Spinner animation="border" />}
        </div>
      </div>

      {data && (
        <Switch>
          <Route path="/" exact render={() => <List data={data.data} />} />
          <Route
            path="/contact/:id"
            exact
            render={() => <Details getContact={getContact} />}
          />
          ;
        </Switch>
      )}
    </Router>
  );
};

export default App;
