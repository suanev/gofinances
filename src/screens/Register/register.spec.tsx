import { act, fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { Register } from ".";
import theme from "../../global/styles/theme";

const Provider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Register screen", () => {
  it("should be open categoryModal when user click on button", () => {
    const { getByTestId } = render(<Register />, { wrapper: Provider });

    const categoryModal = getByTestId("modal-category");
    const buttonCategory = getByTestId("button-category");

    fireEvent.press(buttonCategory);

    waitFor(() => expect(categoryModal.props.visible).toBeTruthy());
  });
});
