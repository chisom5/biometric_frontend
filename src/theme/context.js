import { ThemeProvider } from "styled-components";
import { getTheme } from "./index";

const DarkModeProvider = (props) => {
  const value = getTheme();
  return (
  <ThemeProvider theme={value} {...props} />);
};

export default DarkModeProvider;
