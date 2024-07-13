import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Primary from "./";

describe("Primary Component", () => {
  test("renders children, Header, and Footer", () => {
    // Mock children content
    const mockChildren = (
      <div data-testid="child-content">Mock Child Content</div>
    );

    render(<Primary>{mockChildren}</Primary>);

    // Check if Header is rendered
    const header = screen.getByRole("banner");
    expect(header).toBeInTheDocument();

    // Check if children are rendered
    const childContent = screen.getByTestId("child-content");
    expect(childContent).toBeInTheDocument();
    expect(childContent).toHaveTextContent("Mock Child Content");

    // Find elements within the Footer component structure
    const madeByText = screen.getByText(/Made by/);
    const githubLink = screen.getByLabelText(/GitHub/);

    expect(madeByText).toBeInTheDocument();
    expect(githubLink).toBeInTheDocument();
  });
});
