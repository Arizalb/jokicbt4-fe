import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Grid,
  Paper,
  ThemeProvider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import ComputerIcon from "@mui/icons-material/Computer";
import AssessmentIcon from "@mui/icons-material/Assessment";
import theme from "../theme";

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  background: "linear-gradient(145deg, #f3e5f5 0%, #ede7f6 100%)",
  textAlign: "center",
}));

const Home = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper elevation={3}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: "bold",
              color: "primary.main",
              mb: 3,
            }}
          >
            Selamat Datang di Aplikasi CBT
          </Typography>

          <Typography
            variant="body1"
            paragraph
            sx={{
              maxWidth: 600,
              margin: "0 auto",
              mb: 4,
              color: "text.secondary",
            }}
          >
            Aplikasi Computer Based Test (CBT) yang memudahkan Anda melakukan
            ujian secara online dengan cepat, aman, dan efisien.
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                  bgcolor: "primary.light",
                  borderRadius: 2,
                  color: "primary.contrastText",
                }}
              >
                <SchoolIcon sx={{ fontSize: 50, mb: 2 }} />
                <Typography variant="h6">Ujian Online</Typography>
                <Typography variant="body2" align="center">
                  Lakukan ujian dari mana saja tanpa batasan lokasi
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                  bgcolor: "secondary.light",
                  borderRadius: 2,
                  color: "secondary.contrastText",
                }}
              >
                <ComputerIcon sx={{ fontSize: 50, mb: 2 }} />
                <Typography variant="h6">Akses Mudah</Typography>
                <Typography variant="body2" align="center">
                  Antarmuka intuitif dan ramah pengguna
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  p: 3,
                  bgcolor: "info.light",
                  borderRadius: 2,
                  color: "info.contrastText",
                }}
              >
                <AssessmentIcon sx={{ fontSize: 50, mb: 2 }} />
                <Typography variant="h6">Hasil Cepat</Typography>
                <Typography variant="body2" align="center">
                  Dapatkan hasil ujian secara instan
                </Typography>
              </Box>
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            size="large"
            sx={{ mt: 4 }}
            onClick={() => navigate("/login")}
          >
            Mulai Sekarang
          </Button>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default Home;
