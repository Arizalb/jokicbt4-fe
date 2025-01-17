import React from "react";
import {
  Container,
  Typography,
  Button,
  Box,
  Paper,
  Grid,
  Avatar,
  Card,
  CardContent,
  CardActionArea,
  createTheme,
  ThemeProvider,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import SchoolIcon from "@mui/icons-material/School";
import AssessmentIcon from "@mui/icons-material/Assessment";
import EventNoteIcon from "@mui/icons-material/EventNote";
import PlayCircleOutlineIcon from "@mui/icons-material/PlayCircleOutline";
import Swal from "sweetalert2";
import theme from "../theme";
import kisikisiPDF from "/kisikisi_aul.pdf"; // Path relatif ke folder `public`

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  background: "linear-gradient(145deg, #f0f4ff 0%, #f6f9ff 100%)",
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  transition: "transform 0.3s, box-shadow 0.3s",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: theme.spacing(2),
  "&:hover": {
    transform: "translateY(-10px)",
    boxShadow: "0 12px 20px rgba(0,0,0,0.1)",
  },
}));

const Dashboard = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = kisikisiPDF; // Gunakan URL yang benar
    link.download = "kisikisi_aul.pdf";
    link.click();
  };

  const mulaiUjian = () => {
    Swal.fire({
      title: "Peringatan!",
      text: "Ujian hanya dapat dikerjakan 1 kali. Fokuslah saat mengerjakannya.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Mulai Ujian",
      cancelButtonText: "Batal",
    }).then((result) => {
      if (result.isConfirmed) {
        navigate("/access-token");
      }
    });
  };
  const username = localStorage.getItem("username") || "Peserta";

  const result = () => {
    navigate("/result");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper elevation={3}>
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: "primary.main",
                mx: "auto",
              }}
            >
              {username[0].toUpperCase()}
            </Avatar>
            <Typography
              variant="h5"
              fontWeight="bold"
              sx={{ mt: 2, color: "primary.main" }}
            >
              Selamat Datang, {username}!
            </Typography>
            <Typography
              variant="body1"
              color="text.secondary"
              sx={{ maxWidth: 500, mx: "auto", mt: 1 }}
            >
              Siap untuk memulai ujian hari ini? Pilih menu di bawah untuk
              melanjutkan.
            </Typography>
          </Box>
          <Divider sx={{ mb: 4 }} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <StyledCard elevation={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <SchoolIcon color="primary" sx={{ fontSize: 50, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Mata Pelajaran</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pelajari kisi-kisi yang akan diujikan
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => {
                    handleDownload();
                  }}
                >
                  Download
                </Button>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard elevation={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <AssessmentIcon
                    color="primary"
                    sx={{ fontSize: 50, mr: 2 }}
                  />
                  <Box>
                    <Typography variant="h6">Riwayat Nilai</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Pantau perkembangan nilai ujian Anda
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={result}
                >
                  Lihat
                </Button>
              </StyledCard>
            </Grid>

            <Grid item xs={12} md={4}>
              <StyledCard elevation={3}>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <EventNoteIcon color="primary" sx={{ fontSize: 50, mr: 2 }} />
                  <Box>
                    <Typography variant="h6">Jadwal Ujian</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Lihat jadwal ujian mendatang
                    </Typography>
                  </Box>
                </Box>
                <Button
                  variant="outlined"
                  color="primary"
                  size="small"
                  onClick={() => navigate("/schedule")}
                >
                  Lihat
                </Button>
              </StyledCard>
            </Grid>
          </Grid>
          <Box sx={{ textAlign: "center", mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              size="large"
              startIcon={<PlayCircleOutlineIcon />}
              onClick={mulaiUjian}
            >
              Mulai Ujian
            </Button>
          </Box>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default Dashboard;
