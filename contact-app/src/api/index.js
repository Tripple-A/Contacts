import axios from "axios";

const fetchContacts = () => axios("http://localhost:5000/api/contacts");

const fetchHistory = (id) => axios(`http://localhost:5000/api/history/${id}`);

const saveContact = async (data) => {
  await axios.post("http://localhost:5000/api/contacts", data);
};

const editContact = async (data) => {
  await axios.put(`http://localhost:5000/api/contacts/${data.id}`, data);
};

export { fetchContacts, fetchHistory, saveContact, editContact };
