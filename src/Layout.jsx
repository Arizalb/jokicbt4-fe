import React from "react";
import { Container, Box, CssBaseline } from "@mui/material";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useLocation } from "react-router-dom";

const Layout = ({ children }) => {
  const location = useLocation();
  const isTestPage = location.pathname === "/test";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <CssBaseline />
      {!isTestPage && <Header />}
      <Container component="main" sx={{ flex: 1, mt: 4 }}>
        {children}
      </Container>
      {!isTestPage && <Footer />}
    </Box>
  );
};

export default Layout;
