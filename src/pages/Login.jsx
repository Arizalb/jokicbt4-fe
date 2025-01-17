import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post(
        "https://jokicbt4.vercel.app/api/auth/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } } // Menambahkan header jika diperlukan
      );
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.username);
      localStorage.setItem("user_id", response.data.user_id);
      response.data.role === "admin"
        ? navigate("/admin-dashboard")
        : navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" marginTop={"20px"} component="h1" gutterBottom>
        Login
      </Typography>
      <TextField
        label="email"
        variant="outlined"
        fullWidth
        margin="normal"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button variant="contained" color="primary" onClick={handleLogin}>
        Login
      </Button>
    </Container>
  );
};

export default Login;
