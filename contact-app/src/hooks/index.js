import { useQuery } from "react-query";
import { fetchContacts, fetchHistory } from "../api";

const useFetchContacts = () => {
  const { data, error, isLoading } = useQuery("fetchContacts", fetchContacts);
  return { data, error, isLoading };
};

const useFetchHistory = (id) => {
  const { data, error, isLoading } = useQuery("fetchHistory", () =>
    fetchHistory(id)
  );
  return { data, error, isLoading };
};

export { useFetchContacts, useFetchHistory };
