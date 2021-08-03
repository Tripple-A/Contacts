import { render, screen, fireEvent } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MemoryRouter } from "react-router";
import List from "../components/ContactList";

const data = [{ id: 1, first_name: "Hello", last_name: "Factorial" }];
const queryClient = new QueryClient();
const renderList = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>
        <List data={data} />
      </MemoryRouter>
    </QueryClientProvider>
  );

test("renders and shows all embedded fields", () => {
  renderList();
  const heading = screen.getByText(/Our contact list/i);
  expect(heading).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /add contact/i })
  ).toHaveTextContent("Add Contact");
  expect(screen.getByTestId("contact-name")).toHaveTextContent(
    "Hello Factorial"
  );
  expect(screen.getByText("Hello Factorial").closest("a")).toHaveAttribute(
    "href",
    `/contact/${data[0].id}`
  );
});

test("renders the add form to add new contact on add button click", () => {
  renderList();
  const addButton = screen.getByRole("button", { name: /add contact/i });
  fireEvent.click(addButton);
  expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Phone number")).toBeInTheDocument();
});
