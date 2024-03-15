// ThemeProvider.js
import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const CustomThemeProvider = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

export default CustomThemeProvider;
