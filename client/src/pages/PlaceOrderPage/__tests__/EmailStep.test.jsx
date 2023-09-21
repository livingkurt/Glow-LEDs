import React from "react";
import * as reactRedux from "react-redux";
import { render, screen } from "@testing-library/react";
import EmailStep from "../components/EmailStep";
import { mockState } from "../__mocks__/mockState";

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => jest.fn(),
}));

describe("EmailStep Component", () => {
  beforeEach(() => {
    reactRedux.useSelector.mockImplementation(callback => {
      return callback(mockState);
    });
  });

  it("renders without crashing", () => {
    render(<EmailStep />);
  });

  it("should display an email input field", () => {
    render(<EmailStep />);
    expect(screen.getByLabelText("Email")).toBeInTheDocument();
  });
});
