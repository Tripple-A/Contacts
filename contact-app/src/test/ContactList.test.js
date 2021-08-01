import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router";

import List from "../components/ContactList";

const data = [{ id: 1, first_name: "Hello", last_name: "Factorial" }];
const queryClient = new QueryClient();

test("renders and shows all embedded fields", () => {
  const { getByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <List data={data} />
      </MemoryRouter>
    </QueryClientProvider>
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
