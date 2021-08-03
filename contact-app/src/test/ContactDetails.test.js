import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route } from "react-router";
import Details from "../components/ContactDetails";
import { useDeleteContact, useUpdateContact, useFetchHistory } from "../hooks";

jest.mock("../hooks", () => ({
  useUpdateContact: jest.fn(),
  useDeleteContact: jest.fn(),
  useFetchHistory: jest.fn(),
}));

const data = {
  id: 1,
  first_name: "Hello",
  last_name: "Factorial",
  email: "hello@factorial.com",
  phone_number: "0987654523",
};
const queryClient = new QueryClient();
const getContact = jest.fn();

const renderDetails = (component) =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={["contact/1"]}>
        <Route path="contact/:id">{component}</Route>
      </MemoryRouter>
    </QueryClientProvider>
  );

test("uses the getContact fxn and route id to fetch contact", () => {
  useDeleteContact.mockImplementation(() => ({ isLoading: true }));
  useFetchHistory.mockImplementation(() => ({ isLoading: true }));
  getContact.mockImplementation(() => data);

  renderDetails(<Details getContact={getContact} />);
  expect(getContact).toHaveBeenCalledWith("1");
  expect(screen.getByText(/Contact Details/i)).toBeInTheDocument();
  expect(screen.getByText(/First name: Hello/i)).toBeInTheDocument();
  expect(screen.getByText(/Last name: Factorial/i)).toBeInTheDocument();
  expect(screen.getByText(/Email: hello@factorial.com/i)).toBeInTheDocument();
  expect(screen.getByText(/Phone number: 0987654523/i)).toBeInTheDocument();
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

test("shows edit form containing contact details and calls update function", () => {
  useDeleteContact.mockImplementation(() => ({ isLoading: true }));
  useFetchHistory.mockImplementation(() => ({ isLoading: true }));
  useUpdateContact.mockImplementation(() => ({ mutate: jest.fn() }));
  getContact.mockImplementation(() => data);

  renderDetails(<Details getContact={getContact} />);
  expect(screen.getByText(/First name: Hello/i)).toBeInTheDocument();
  expect(useUpdateContact).toHaveBeenCalledTimes(1);
  const editButton = screen.getByRole("button", { name: /edit/i });
  fireEvent.click(editButton);
  expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
  expect(useUpdateContact).toHaveBeenCalledTimes(2);
});

test("it redirects to the Home Page after deleting a contact", () => {
  useDeleteContact.mockImplementation(() => ({ isSuccess: true }));
  useFetchHistory.mockImplementation(() => ({ isLoading: true }));
  useUpdateContact.mockImplementation(() => ({ mutate: jest.fn() }));
  getContact.mockImplementation(() => data);

  renderDetails(<Details getContact={getContact} />);
  expect(screen.queryByText("First name")).toBeNull;
  expect(screen.queryByText("Edit History")).toBeNull;
  expect(window.location.pathname).toBe("/");
});
