import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { useFetchContacts } from "../hooks";
import App from "../containers/App";

const queryClient = new QueryClient();
jest.mock("../hooks", () => ({
  useFetchContacts: jest.fn(),
  useSaveContact: jest.fn(),
}));
const renderApp = () =>
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );

test("renders, shows the app name successfully and begins loading contacts", () => {
  useFetchContacts.mockImplementation(() => ({ isLoading: true }));
  renderApp();

  expect(screen.getByText(/Contact Application/i)).toBeInTheDocument();
  expect(useFetchContacts).toHaveBeenCalledTimes(1);
  expect(screen.getByTestId("spinner")).toBeInTheDocument();
});

test("renders error when unable to fetch queries", () => {
  useFetchContacts.mockImplementation(() => ({ error: true }));
  renderApp();
  expect(screen.getByText(/Contact Application/i)).toBeInTheDocument();
  expect(useFetchContacts).toHaveBeenCalledTimes(1);
  expect(
    screen.getByText("There was an error loading the contacts")
  ).toBeInTheDocument();
});

test("renders contacts after being fetched", () => {
  useFetchContacts.mockImplementation(() => ({
    data: [{ id: 1, first_name: "Hello", last_name: "You" }],
  }));
  renderApp();

  expect(screen.getByText(/Contact Application/i)).toBeInTheDocument();
  expect(useFetchContacts).toHaveBeenCalledTimes(1);
  expect(
    screen.queryByText("There was an error loading the contacts")
  ).toBeNull();
  expect(screen.getByText("Hello You")).toBeInTheDocument();
});
