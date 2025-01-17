import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { styled, ThemeProvider } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

// Styled Logo
const Logo = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: "1.5rem",
  color: theme.palette.primary.contrastText,
  cursor: "pointer",
}));

const Header = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("name");
    localStorage.removeItem("role");
    navigate("/login");
    setMobileOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // Komponen menu untuk desktop dan mobile
  const MenuItems = () => (
    <>
      {!token ? (
        <>
          <Button
            color="inherit"
            component={Link}
            to="/"
            onClick={handleDrawerToggle}
          >
            Home
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/login"
            onClick={handleDrawerToggle}
          >
            Login
          </Button>
          <Button
            color="secondary"
            component={Link}
            to="/register"
            onClick={handleDrawerToggle}
            variant="contained"
          >
            Register
          </Button>
        </>
      ) : (
        <>
          <Button
            color="inherit"
            component={Link}
            to="/dashboard"
            onClick={handleDrawerToggle}
          >
            Dashboard
          </Button>
          <Button
            color="inherit"
            component={Link}
            to="/profile"
            onClick={handleDrawerToggle}
          >
            Profile
          </Button>
          <Button color="secondary" variant="contained" onClick={handleLogout}>
            Logout
          </Button>
        </>
      )}
    </>
  );

  return (
    <ThemeProvider theme={theme}>
      <AppBar
        position="static"
        color="primary"
        sx={{
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            disableGutters
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Logo variant="h6" onClick={() => navigate("/")}>
              CBT App
            </Logo>

            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={handleDrawerToggle}
                >
                  {mobileOpen ? <CloseIcon /> : <MenuIcon />}
                </IconButton>

                <Drawer
                  variant="temporary"
                  anchor="right"
                  open={mobileOpen}
                  onClose={handleDrawerToggle}
                  ModalProps={{
                    keepMounted: true, // Better open performance on mobile.
                  }}
                  sx={{
                    "& .MuiDrawer-paper": {
                      boxSizing: "border-box",
                      width: "250px",
                      backgroundColor: theme.palette.primary.main,
                      color: theme.palette.primary.contrastText,
                    },
                  }}
                >
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      padding: 2,
                    }}
                  >
                    <MenuItems />
                  </Box>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <MenuItems />
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </ThemeProvider>
  );
};

export default Header;
