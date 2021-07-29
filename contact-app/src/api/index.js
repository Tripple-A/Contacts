import axios from "axios";

const fetchContacts = () => axios("http://localhost:5000/api/contacts");

const fetchHistory = (id) => axios(`http://localhost:5000/api/history/${id}`);

export { fetchContacts, fetchHistory };
