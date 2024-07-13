import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import CustomTextField, { CustomTextFieldProps } from "./";
import { Colors } from "styles/theme/color";

describe("CustomTextField Component", () => {
  const mockProps: CustomTextFieldProps = {
    label: "Name",
    placeholder: "Enter your name",
    name: "name",
    value: "",
    errors: {},
    handleChange: jest.fn(),
    onBlur: jest.fn(),
  };

  const renderComponent = (props: Partial<CustomTextFieldProps> = {}) => {
    const mergedProps = { ...mockProps, ...props };
    return render(<CustomTextField {...mergedProps} />);
  };

  it("renders CustomTextField with label and placeholder", () => {
    renderComponent();
    const labelElement = screen.getByText("Name");
    expect(labelElement).toBeInTheDocument();
  });

  it("calls handleChange when input value changes", () => {
    renderComponent();
    const inputElement = screen.getByRole("textbox");
    fireEvent.change(inputElement, { target: { value: "John Doe" } });

    expect(mockProps.handleChange).toHaveBeenCalledWith(expect.any(Object));
  });

  it("renders error message when there are errors", () => {
    const errorProps: CustomTextFieldProps = {
      ...mockProps,
      errors: { name: "Name is required" },
    };
    renderComponent(errorProps);
    const errorElement = screen.getByText("Name is required");
    expect(errorElement).toBeInTheDocument();
  });

  it("applies focused styles when input is focused", () => {
    renderComponent();
    const inputElement = screen.getByRole("textbox");
    fireEvent.focus(inputElement);
    const focusedInput = screen.getByTestId("custom-text-field");
    expect(focusedInput).toHaveStyle(`border: 0px`);
  });
});
