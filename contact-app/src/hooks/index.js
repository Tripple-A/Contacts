import { useQuery, useMutation, useQueryClient } from "react-query";
import { fetchContacts, fetchHistory, saveContact, editContact } from "../api";

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

const useSaveContact = () => {
  const queryClient = useQueryClient();
  const { isSuccess, error, isError, mutate } = useMutation(saveContact, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchContacts");
    },
  });
  return { isSuccess, error, isError, mutate };
};

const useUpdateContact = () => {
  const queryClient = useQueryClient();
  const { isSuccess, error, isError, mutate } = useMutation(editContact, {
    onSuccess: () => {
      queryClient.invalidateQueries();
    },
  });
  return { isSuccess, error, isError, mutate };
};

const useSaveOrUpdateContact = (edit) => {
  const update = useUpdateContact();
  const save = useSaveContact();
  if (edit) {
    return update;
  } else {
    return save;
  }
};

export { useFetchContacts, useFetchHistory, useSaveOrUpdateContact };
