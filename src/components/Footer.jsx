import React from "react";
import {
  Container,
  Typography,
  Link,
  Box,
  Grid,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import {
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  Instagram as InstagramIcon,
  LinkedIn as LinkedInIcon,
} from "@mui/icons-material";
import theme from "../theme"; // Ensure to adjust the import path to where you saved your theme
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const ownerName = "Aulia Regina"; // Replace with the actual owner's name
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          backgroundColor: theme.palette.secondary.main,
          color: theme.palette.secondary.contrastText,
          py: 4,
          mt: 3,
        }}
      >
        <Container>
          <Grid container spacing={2} alignItems="center">
            {/* Left Section */}
            <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "left" }}>
              <Typography variant="h6" gutterBottom>
                CBT Application
              </Typography>
              <Typography variant="body2">
                © {new Date().getFullYear()} All rights reserved.
              </Typography>
              <Typography variant="body2">
                Built by{" "}
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: theme.palette.primary.main,
                    textDecoration: "none",
                    fontWeight: "bold",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  {ownerName}
                </Link>
              </Typography>
            </Grid>

            {/* Right Section */}
            <Grid item xs={12} md={6} textAlign={{ xs: "center", md: "right" }}>
              <Box>
                <Typography variant="body2" gutterBottom>
                  Follow me on:
                </Typography>
                <IconButton
                  navigate="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  sx={{ color: "inherit" }}
                >
                  <FacebookIcon />
                </IconButton>
                <IconButton
                  navigate="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Twitter"
                  sx={{ color: "inherit" }}
                >
                  <TwitterIcon />
                </IconButton>
                <IconButton
                  href="https://instagram.com/auliareginasp"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  sx={{ color: "inherit" }}
                >
                  <InstagramIcon />
                </IconButton>
                <IconButton
                  navigate="#"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  sx={{ color: "inherit" }}
                >
                  <LinkedInIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </ThemeProvider>
  );
};

export default Footer;
