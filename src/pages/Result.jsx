import React, { useEffect, useState } from "react";
import axios from "axios"; // Import axios
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Button,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { styled } from "@mui/material/styles";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import ReplayIcon from "@mui/icons-material/Replay";
import ScoreIcon from "@mui/icons-material/Score";
import EyeIcon from "@mui/icons-material/RemoveRedEye";
import theme from "../theme";

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  background: "linear-gradient(145deg, #f0f4ff 0%, #f6f9ff 100%)",
  textAlign: "center",
}));

const Result = () => {
  const navigate = useNavigate();
  const [score, setScore] = useState(0); // Set initial score to 0
  const [totalQuestions, setTotalQuestions] = useState(0); // Set total questions
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchResult = async () => {
      const token = localStorage.getItem("token");
      const user_id = localStorage.getItem("user_id");
      try {
        const response = await axios.get(
          `https://jokicbt4.vercel.app/api/results/${user_id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const result = response.data.results[0]; // Assuming results is an array
        setScore(result.totalScore); // Set score from API
        setTotalQuestions(result.answers.length); // Set total questions from response
      } catch (err) {
        setError("Failed to fetch result.");
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, []);

  // Calculate percentage
  const percentage = ((score / totalQuestions) * totalQuestions).toFixed(2);

  // Determine pass/fail status and color
  const isPassed = score >= 70;
  const statusColor = isPassed ? "success.main" : "error.main";
  const statusIcon = isPassed ? (
    <CheckCircleIcon color="success" sx={{ fontSize: 100 }} />
  ) : (
    <ErrorOutlineIcon color="error" sx={{ fontSize: 100 }} />
  );

  const handleRetry = () => {
    navigate("/dashboard");
  };

  const handleDetail = () => {
    navigate("/my-result");
  };

  if (loading) return <Typography>Loading...</Typography>; // Handle loading state
  if (error) return <Typography>{error}</Typography>; // Handle error state

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <StyledPaper elevation={3}>
          <Box sx={{ mb: 3 }}>{statusIcon}</Box>

          <Typography
            variant="h4"
            component="h1"
            gutterBottom
            sx={{
              color: statusColor,
              fontWeight: "bold",
            }}
          >
            {isPassed ? "Selamat! Anda Lulus" : "Mohon Coba Lagi"}
          </Typography>

          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  py: 2,
                  borderRadius: 2,
                }}
              >
                <ScoreIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Skor: {score} / {totalQuestions} soal
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  bgcolor: isPassed ? "success.light" : "error.light",
                  color: isPassed
                    ? "success.contrastText"
                    : "error.contrastText",
                  py: 2,
                  borderRadius: 2,
                }}
              >
                <Typography variant="h6">Persentase: {percentage}%</Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<ReplayIcon />}
              onClick={handleRetry}
            >
              Kembali ke Dashboard
            </Button>
          </Box>
          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<EyeIcon />}
              onClick={handleDetail}
            >
              Lihat Detail
            </Button>
          </Box>

          {!isPassed && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="body1" color="text.secondary">
                Anda belum mencapai nilai kelulusan. Silakan pelajari materi
                lebih lanjut.
              </Typography>
            </Box>
          )}
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default Result;
