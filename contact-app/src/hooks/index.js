import { useQuery } from "react-query";
import { fetchContacts } from "../api";

const useFetchContacts = () => {
  const { data, error, isLoading } = useQuery("fetchContacts", fetchContacts, {
    staleTime: Infinity,
  });
  return { data, error, isLoading };
};
export { useFetchContacts };
