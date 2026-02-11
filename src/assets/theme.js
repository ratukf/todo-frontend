// src/theme.js
import { createTheme } from "@mui/material/styles";

const PRIMARY_FONT = "'Inter', sans-serif";
const SECONDARY_FONT = "'Roboto', sans-serif";

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000000", // hitam
    },
    secondary: {
      main: "#FFFFFF", // putih
    },
    background: {
      default: "#FFFFFF",
      paper: "#F5F5F5",
    },
    text: {
      primary: "#000000",
      secondary: "#555555",
    },
  },
  typography: {
    fontFamily: PRIMARY_FONT,
    h1: { fontFamily: PRIMARY_FONT, fontWeight: 800 },
    h2: { fontFamily: PRIMARY_FONT, fontWeight: 700 },
    h3: { fontFamily: PRIMARY_FONT, fontWeight: 600 },
    h4: { fontFamily: PRIMARY_FONT, fontWeight: 600 },
    h5: { fontFamily: PRIMARY_FONT, fontWeight: 500 },
    h6: { fontFamily: PRIMARY_FONT, fontWeight: 500 },
    body1: { fontFamily: SECONDARY_FONT },
    body2: { fontFamily: SECONDARY_FONT },
    button: { fontFamily: SECONDARY_FONT, textTransform: "none" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          },
        },
        contained: {
          backgroundColor: "#000",
          color: "#fff",
          "&:hover": {
            backgroundColor: "#111",
          },
        },
        outlined: {
          borderColor: "#000",
          color: "#000",
          "&:hover": {
            borderColor: "#111",
            backgroundColor: "#f5f5f5",
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            backgroundColor: "#F0F0F0",
            borderRadius: 8,
            "& fieldset": {
              border: "none", // hilangkan border
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
            boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: "0 4px 4px rgba(0,0,0,0.05)",
          backgroundColor: "#fff",
        },
      },
    },
  },
});

export default theme;
