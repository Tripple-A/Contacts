import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

import List from "../components/ContactList";

const data = [{ id: 1, first_name: "Hello", last_name: "Factorial" }];
const queryClient = new QueryClient();

test("renders and shows all embedded fields", () => {
  const { getByTestId } = render(
    <MemoryRouter>
      <List data={data} />
    </MemoryRouter>
  );
  const heading = screen.getByText(/Our contact list/i);
  expect(heading).toBeInTheDocument();
  expect(getByTestId("addButton")).toHaveTextContent("Add Contact");
  expect(getByTestId("contactName")).toHaveTextContent("Hello Factorial");
  fireEvent.click(screen.getByText("Hello Factorial"));
});

test("renders the add form to add new contact on add button click", () => {
  const { getByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <List data={data} />
      </MemoryRouter>
    </QueryClientProvider>
  );
  const addButton = getByTestId("addButton");
  fireEvent.click(addButton);
  expect(getByTestId("firstname-field")).toBeInTheDocument();
  expect(getByTestId("lastname-field")).toBeInTheDocument();
  expect(getByTestId("email-field")).toBeInTheDocument();
  expect(getByTestId("phone-field")).toBeInTheDocument();
});

test("we see a new contact on the page after save", () => {
  const { getByTestId, getByLabelText } = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <List data={data} />
      </MemoryRouter>
    </QueryClientProvider>
  );
  const addButton = getByTestId("addButton");
  fireEvent.click(addButton);
  userEvent.type(getByTestId("firstname-field"), "Jayy");
  userEvent.type(getByTestId("lastname-field"), "Dee");
  userEvent.type(getByTestId("email-field"), "john.dee@someemail.com");

  //   fireEvent.change(firstName, { target: { value: "Software" } });
  //   expect(firstName.value).toBe("Software");
  const lastName = getByTestId("lastname-field");
  fireEvent.change(lastName, { target: { value: "Dev" } });
  //   expect(firstName.value).toBe("Dev");
  //   const email = getByTestId("email-field");
  //   fireEvent.change(email, { target: { value: "soft@dev.com" } });
  //   expect(getByTestId("firstname-field").value).toBe("Dev");

  //   const phone = getByTestId("phone-field");
  //   fireEvent.change(phone, { target: { value: "2548695" } });
  expect(getByTestId("phone-fiellele")).toBeInTheDocument();
});
