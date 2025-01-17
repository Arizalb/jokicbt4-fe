import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  IconButton,
  Box,
  Grid,
} from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TokenManagement = () => {
  const [tokens, setTokens] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [currentToken, setCurrentToken] = useState({
    id: null,
    token: "",
    created_at: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchTokens();
  }, []);

  const fetchTokens = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://jokicbt4.vercel.app/api/access-tokens",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTokens(response.data.sort((a, b) => a.id - b.id));
    } catch (error) {
      toast.error("Failed to fetch tokens");
      console.error("Error fetching tokens", error);
    }
  };

  const handleOpenDialog = (token = null) => {
    if (token) {
      // Edit mode
      setCurrentToken(token);
      setIsEditing(true);
    } else {
      // Create mode
      setCurrentToken({ id: null, token: "", created_at: "" });
      setIsEditing(false);
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentToken({ id: null, token: "", created_at: "" });
  };

  const handleSaveToken = async () => {
    const authToken = localStorage.getItem("token");
    try {
      if (isEditing) {
        // Update existing token
        await axios.put(
          `https://jokicbt4.vercel.app/api/access-tokens/update/${currentToken.id}`,
          currentToken,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        toast.success("Token updated successfully");
      } else {
        // Create new token
        await axios.post(
          "https://jokicbt4.vercel.app/api/access-tokens",
          currentToken,
          { headers: { Authorization: `Bearer ${authToken}` } }
        );
        toast.success("Token created successfully");
      }

      // Refresh tokens
      fetchTokens();
      handleCloseDialog();
    } catch (error) {
      toast.error("Failed to save token");
      console.error("Error saving token", error);
    }
  };

  const handleDeleteToken = async (tokenId) => {
    const authToken = localStorage.getItem("token");
    try {
      await axios.delete(
        `https://jokicbt4.vercel.app/api/access-tokens/delete/${tokenId}`,
        {
          headers: { Authorization: `Bearer ${authToken}` },
        }
      );
      toast.success("Token deleted successfully");
      fetchTokens();
    } catch (error) {
      toast.error("Failed to delete token");
      console.error("Error deleting token", error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentToken((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="md">
      <ToastContainer />

      <Box my={4}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h6">Token Management</Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="primary"
              startIcon={<AddIcon />}
              onClick={() => handleOpenDialog()}
            >
              Add New Token
            </Button>
          </Grid>
        </Grid>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Token</TableCell>
              <TableCell>Created At</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tokens.map((token) => (
              <TableRow key={token.id}>
                <TableCell>{token.id}</TableCell>
                <TableCell>{token.token}</TableCell>
                <TableCell>{token.created_at}</TableCell>
                <TableCell align="right">
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenDialog(token)}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="secondary"
                    onClick={() => handleDeleteToken(token.id)}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Dialog untuk Create/Edit */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>
          {isEditing ? "Edit Token" : "Create New Token"}
        </DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            name="token"
            label="Token"
            fullWidth
            value={currentToken.token}
            onChange={handleInputChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleSaveToken} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default TokenManagement;
