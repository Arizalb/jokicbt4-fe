import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#D6BD1B", // Ungu pastel
      contrastText: "#FFFFFF", // Putih
    },
    secondary: {
      main: "#1B34D6", // Oranye pastel
      contrastText: "#FFFFFF", // Coklat gelap
    },
  },

  typography: {
    fontFamily:
      "Fira Code, JetBrains Mono, Inter, Helvetica, Poppins, Arial, sans-serif",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: 8,
          margin: "0 8px",
        },
      },
    },
  },
});

export default theme;
