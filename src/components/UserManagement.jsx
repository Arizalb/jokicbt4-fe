import React from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const UserManagement = ({
  users,
  newUser,
  setNewUser,
  handleAddUser,
  handleDeleteUser,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        User Management
      </Typography>
      <List>
        {Array.isArray(users) && users.length > 0 ? (
          users.map((user) => (
            <ListItem key={user._id}>
              <ListItemText
                primary={user.username}
                secondary={user.email + " | " + user.role}
              />
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => handleDeleteUser(user._id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No users available.
          </Typography>
        )}
      </List>
      <Box mt={2}>
        <TextField
          label="Username"
          value={newUser.username}
          onChange={(e) => setNewUser({ ...newUser, username: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Email"
          value={newUser.email}
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Password"
          type="password"
          value={newUser.password}
          onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
          fullWidth
          margin="dense"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddUser}
          fullWidth
        >
          Add User
        </Button>
      </Box>
    </Box>
  );
};

export default UserManagement;
