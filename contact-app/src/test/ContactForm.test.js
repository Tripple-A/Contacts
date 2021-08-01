import { render, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "react-query";
import Form from "../components/ContactForm";

const queryClient = new QueryClient();
const handleSubmit = jest.fn();

test("it renders without crashing", () => {
  const { getByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <Form saveContact={{ mutate: handleSubmit }} />
    </QueryClientProvider>
  );

  expect(getByTestId("firstname-field")).toBeInTheDocument();
  expect(getByTestId("lastname-field")).toBeInTheDocument();
  expect(getByTestId("email-field")).toBeInTheDocument();
  expect(getByTestId("phone-field")).toBeInTheDocument();
  expect(getByTestId("save-button")).toBeInTheDocument();
});

test("the form fields update on user type event and submits successfully", async () => {
  const { getByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <Form saveContact={{ mutate: handleSubmit }} />
    </QueryClientProvider>
  );

  const firstName = getByTestId("firstname-field");
  fireEvent.change(firstName, { target: { value: "Software" } });
  expect(firstName.value).toBe("Software");

  const lastName = getByTestId("lastname-field");
  fireEvent.change(lastName, { target: { value: "Dev" } });
  expect(lastName.value).toBe("Dev");

  const email = getByTestId("email-field");
  fireEvent.change(email, { target: { value: "soft@dev.com" } });
  expect(email.value).toBe("soft@dev.com");

  const phone = getByTestId("phone-field");
  fireEvent.change(phone, { target: { value: "2548695" } });
  expect(phone.value).toBe("2548695");

  const saveButton = getByTestId("save-button");
  fireEvent.click(saveButton);

  await waitFor(() =>
    expect(handleSubmit).toHaveBeenCalledWith({
      email: "soft@dev.com",
      first_name: "Software",
      last_name: "Dev",
      phone_number: "2548695",
    })
  );
});

test("save button shows the update text when edit prop is passed", () => {
  const { getByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <Form saveContact={{ mutate: handleSubmit }} edit />
    </QueryClientProvider>
  );

  const saveButton = getByTestId("save-button");
  expect(saveButton).toHaveTextContent("Update");
});

test("form will not submit if all fields are not filled", () => {
  const { getByTestId } = render(
    <QueryClientProvider client={queryClient}>
      <Form saveContact={{ mutate: handleSubmit }} />
    </QueryClientProvider>
  );

  const email = getByTestId("email-field");
  fireEvent.change(email, { target: { value: "soft@dev.com" } });
  expect(email.value).toBe("soft@dev.com");
  const saveButton = getByTestId("save-button");
  fireEvent.click(saveButton);
  expect(handleSubmit).not.toHaveBeenCalledWith;
});
