import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#D4B280",
    },
    secondary: {
      main: "#FFEDCB",
    },
    error: {
      main: "#C1554E",
    },
    success: {
      main: "#548E55",
    },
  },
});

export default theme;
