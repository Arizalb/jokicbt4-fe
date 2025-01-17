import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { styled } from "@mui/material/styles";
import theme from "../theme";

const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  background: "linear-gradient(145deg, #f0f4ff 0%, #f6f9ff 100%)",
}));

const MyResults = () => {
  const [resultData, setResultData] = useState(null);
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
        setResultData(response.data.results[0]);
      } catch (err) {
        setError("Gagal mengambil hasil ujian.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchResult();
  }, []);

  if (loading) return <Typography>Memuat...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!resultData) return null;

  const totalQuestions = resultData.answers.length;
  const correctAnswers = resultData.answers.filter(
    (answer) => answer.isCorrect
  ).length;
  const incorrectAnswers = totalQuestions - correctAnswers;

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <StyledPaper>
          <Typography variant="h4" gutterBottom>
            Detail Hasil Ujian
          </Typography>

          <Grid container spacing={3} sx={{ mb: 3 }}>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "primary.light",
                  color: "primary.contrastText",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography>Total Skor: {resultData.totalScore}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "success.light",
                  color: "success.contrastText",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography>Jawaban Benar: {correctAnswers}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  bgcolor: "error.light",
                  color: "error.contrastText",
                  p: 2,
                  borderRadius: 2,
                }}
              >
                <Typography>Jawaban Salah: {incorrectAnswers}</Typography>
              </Box>
            </Grid>
          </Grid>

          <TableContainer component={Paper} variant="outlined">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>No. Soal</TableCell>
                  <TableCell>Jawaban Anda</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Poin</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {resultData.answers.map((answer, index) => (
                  <TableRow key={answer._id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{answer.userAnswer}</TableCell>
                    <TableCell>
                      <Chip
                        label={answer.isCorrect ? "Benar" : "Salah"}
                        color={answer.isCorrect ? "success" : "error"}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{answer.score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default MyResults;
