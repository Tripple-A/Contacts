import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  fetchContacts,
  fetchHistory,
  saveContact,
  editContact,
  deleteContact,
} from "../api";

const useFetchContacts = () => {
  const { data, error, isLoading } = useQuery("fetchContacts", fetchContacts);
  return { data, error, isLoading };
};

const useFetchHistory = (id) => {
  return useQuery("fetchHistory", () => fetchHistory(id));
};

const useSaveContact = () => {
  const queryClient = useQueryClient();
  return useMutation(saveContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchContacts");
    },
  });
};

const useUpdateContact = () => {
  const queryClient = useQueryClient();
  return useMutation(editContact, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
};

const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation(deleteContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchContacts");
    },
  });
};

export {
  useFetchContacts,
  useFetchHistory,
  useSaveContact,
  useUpdateContact,
  useDeleteContact,
};
