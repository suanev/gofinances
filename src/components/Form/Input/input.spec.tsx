import { render } from "@testing-library/react-native";
import React from "react";
import { ThemeProvider } from "styled-components/native";
import { Input } from ".";
import theme from "../../../global/styles/theme";

const Provider: React.FC = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

describe("Input", () => {
  it("must have a specific border color when active", () => {
    const { getByTestId } = render(
      <Input testID="input-email" active={true} />,
      { wrapper: Provider }
    );

    const inputComponent = getByTestId("input-email");

    expect(inputComponent.props.style[0].borderColor).toEqual("#E83F5B");

    expect(inputComponent.props.style[0].borderWidth).toEqual(3);
  });
});
