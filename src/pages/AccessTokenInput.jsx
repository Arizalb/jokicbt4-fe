import React, { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  createTheme,
  ThemeProvider,
  InputAdornment,
  IconButton,
  Alert,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import theme from "../theme";

// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  padding: theme.spacing(4),
  boxShadow: "0 8px 16px rgba(0,0,0,0.1)",
  background: "linear-gradient(145deg, #f0f4ff 0%, #f6f9ff 100%)",
}));

const AccessTokenInput = () => {
  const [code, setCode] = useState(""); // Mengganti 'accessToken' dengan 'code'
  const [showCode, setShowCode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Reset error state
    setError(null);

    // Validasi input
    if (!code.trim()) {
      setError("Kode tidak boleh kosong");
      return;
    }

    setLoading(true);

    try {
      // Ganti URL API sesuai dengan rute backend yang ada
      const response = await axios.get(`/api/questions/${code}`);

      // Simpan kode ke localStorage jika diperlukan
      localStorage.setItem("code", code);
      console.log(code);

      // Navigasi ke halaman test
      navigate("/test", {
        state: {
          questions: response.data, // Menyertakan data soal dari response
        },
      });
    } catch (error) {
      setError(
        error.response?.data.message ||
          "Terjadi kesalahan. Mohon periksa kembali kode yang dimasukkan."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      console.log(code);
      handleSubmit();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        maxWidth="sm"
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <StyledPaper elevation={3}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <VpnKeyIcon
              sx={{
                fontSize: 80,
                color: "primary.main",
                mb: 2,
              }}
            />
            <Typography
              variant="h4"
              component="h1"
              gutterBottom
              sx={{
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Masukkan Kode Akses
            </Typography>
          </Box>

          {error && (
            <Box sx={{ mb: 2 }}>
              <Alert severity="error" sx={{ borderRadius: 2 }}>
                {error}
              </Alert>
            </Box>
          )}

          <TextField
            label="Kode Akses"
            variant="outlined"
            fullWidth
            margin="normal"
            type={showCode ? "text" : "password"}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyPress={handleKeyPress}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowCode(!showCode)} edge="end">
                    {showCode ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            onClick={handleSubmit}
            disabled={loading}
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 2,
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Verifikasi Kode"}
          </Button>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mt: 2,
              textAlign: "center",
            }}
          >
            Masukkan kode akses yang valid untuk melanjutkan ujian
          </Typography>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default AccessTokenInput;
