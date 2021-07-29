import axios from "axios";

const fetchContacts = () => axios("http://localhost:5000/api/contacts");

export { fetchContacts };
