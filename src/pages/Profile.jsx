import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  CircularProgress,
  Alert,
  Paper,
  Grid,
  Avatar,
  Box,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import PersonIcon from "@mui/icons-material/Person";
import EmailIcon from "@mui/icons-material/Email";
import WorkIcon from "@mui/icons-material/Work";
import EditIcon from "@mui/icons-material/Edit";

// Custom Theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    background: {
      default: "#f4f4f4",
    },
  },
  typography: {
    fontFamily: "Poppins, Arial, sans-serif",
  },
});

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  background: "linear-gradient(145deg, #f0f4ff 0%, #f6f9ff 100%)",
}));

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("Token tidak ditemukan. Silakan login kembali.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          "https://jokicbt4.vercel.app/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProfile(response.data);
      } catch (err) {
        setError(err.response?.data?.message || "Terjadi kesalahan.");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress size={60} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ borderRadius: 2 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <StyledPaper elevation={3}>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={4} sx={{ textAlign: "center" }}>
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  margin: "0 auto",
                  bgcolor: "primary.main",
                  fontSize: "3rem",
                }}
              >
                {profile.username[0].toUpperCase()}
              </Avatar>
            </Grid>
            <Grid item xs={12} md={8}>
              <Typography variant="h4" gutterBottom>
                Profil Pengguna
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <PersonIcon sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="body1">
                  Username: {profile.username}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <EmailIcon sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="body1">Email: {profile.email}</Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <WorkIcon sx={{ mr: 2, color: "primary.main" }} />
                <Typography variant="body1">Role: {profile.role}</Typography>
              </Box>

              <Button
                variant="contained"
                startIcon={<EditIcon />}
                sx={{ mt: 2 }}
              >
                Edit Profil
              </Button>
            </Grid>
          </Grid>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default Profile;
