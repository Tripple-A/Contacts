import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import App from "../containers/App";

const queryClient = new QueryClient();

test("renders and shows the app name successfully", () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  const appName = screen.getByText(/Contact Application/i);
  expect(appName).toBeInTheDocument();
});
