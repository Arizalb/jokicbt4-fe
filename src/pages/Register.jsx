import React, { useState } from "react";
import { Container, TextField, Button, Typography } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2"; // Import SweetAlert

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await axios.post("https://jokicbt4.vercel.app/api/auth/register", {
        username,
        email,
        password,
      });
      // Menampilkan SweetAlert untuk pendaftaran berhasil
      Swal.fire({
        icon: "success",
        title: "Registration successful!",
        text: "You have successfully registered.",
      });
    } catch (error) {
      console.error("Registration failed:", error.response.data.message);
      // Menampilkan SweetAlert untuk pendaftaran gagal
      Swal.fire({
        icon: "error",
        title: "Registration failed!",
        text:
          error.response.data.message ||
          "An error occurred during registration.",
      });
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" marginTop={"20px"} component="h1" gutterBottom>
        Register
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Email"
        variant="outlined"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
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
      <Button variant="contained" color="primary" onClick={handleRegister}>
        Register
      </Button>
    </Container>
  );
};

export default Register;
