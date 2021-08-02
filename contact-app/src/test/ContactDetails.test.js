import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter, Route } from "react-router";
import Details from "../components/ContactDetails";
import { useUpdateContact } from "../hooks";

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

test("renders and shows all embedded text when location params are provided", () => {
  renderDetails(
    <Details location={{ contact: data }} getContact={getContact} />
  );
  expect(getContact).not.toHaveBeenCalled;
  expect(screen.getByText(/Contact Details/i)).toBeInTheDocument();
  expect(screen.getByText(/First name: Hello/i)).toBeInTheDocument();
  expect(screen.getByText(/Last name: Factorial/i)).toBeInTheDocument();
  expect(screen.getByText(/Email: hello@factorial.com/i)).toBeInTheDocument();
  expect(screen.getByText(/Phone number: 0987654523/i)).toBeInTheDocument();
});

test("uses the getContact fxn and routeid to fetch contact", () => {
  renderDetails(<Details getContact={getContact} />);
  expect(getContact).toHaveBeenCalledWith("1");
});

test("successfully edits a contact", () => {
  const { getByTestId } = renderDetails(
    <Details location={{ contact: data }} />
  );
  expect(screen.getByText(/First name: Hello/i)).toBeInTheDocument();
  const editButton = getByTestId("edit-button");
  fireEvent.click(editButton);
});
