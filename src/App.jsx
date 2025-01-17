import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Test from "./pages/Test";
import Result from "./pages/Result";
import Profile from "./pages/Profile";
import AccessTokenInput from "./pages/AccessTokenInput";
import AdminDashboard from "./pages/AdminDashboard";
import Layout from "./Layout"; // Adjust the import path if necessary
import MyResults from "./pages/MyResults";

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/access-token"
          element={
            <ProtectedRoute>
              <AccessTokenInput />
            </ProtectedRoute>
          }
        />
        <Route
          path="/test"
          element={
            <ProtectedRoute>
              <Test />
            </ProtectedRoute>
          }
        />
        <Route
          path="/result"
          element={
            <ProtectedRoute>
              <Result />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-result"
          element={
            <ProtectedRoute>
              <MyResults />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
}

export default App;
