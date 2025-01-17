import React, { useState, useEffect } from "react";
import { Container, Grid } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";

import Header from "../components/AdminHeader";
import UserManagement from "../components/UserManagement";
import QuestionManagement from "../components/QuestionManagement";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [subject, setSubject] = useState(""); // State untuk subject
  const [code, setCode] = useState(""); // State untuk kode soal

  const [newQuestion, setNewQuestion] = useState({
    question: "",
    optionA: "",
    optionB: "",
    optionC: "",
    optionD: "",
    correctOption: "",
    score: 0,
  });

  useEffect(() => {
    fetchUsers();
    fetchQuestions();
  }, []);

  // Fetch functions
  const fetchUsers = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://jokicbt4.vercel.app/api/users/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUsers(response.data.users || []);
    } catch (error) {
      console.error("Error fetching users", error);
    }
  };

  const fetchQuestions = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "https://jokicbt4.vercel.app/api/questions/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setQuestions(response.data.questions || []);
    } catch (error) {
      console.error("Error fetching questions", error);
    }
  };

  // Handler functions
  const handleAddUser = async () => {
    const token = localStorage.getItem("token");

    // Validasi input
    if (!newUser.username || !newUser.email || !newUser.password) {
      Swal.fire("Error", "Please fill in all fields", "error");
      return;
    }

    try {
      const response = await axios.post(
        "https://jokicbt4.vercel.app/api/auth/register",
        newUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      // Tampilkan pesan sukses dan reset input
      Swal.fire("Success", "User added successfully", "success");
      console.log("New user response: ", response.data);
      setNewUser({ username: "", email: "", password: "" });
      fetchUsers();
    } catch (error) {
      console.error(
        "Error adding user:",
        error.response?.data || error.message
      );

      // Tampilkan pesan error lebih informatif
      Swal.fire(
        "Error",
        error.response?.data?.message || "Failed to add user",
        "error"
      );
    }
  };

  const handleDeleteUser = async (id) => {
    console.log("Menghapus user dengan id:", id);
    const token = localStorage.getItem("token");

    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://jokicbt4.vercel.app/api/users/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        Swal.fire("Success", "User deleted successfully", "success");

        // Update state secara lokal setelah menghapus user
        setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
      } catch (error) {
        Swal.fire("Error", "Failed to delete user", "error");
        console.error(
          "Error deleting user:",
          error.response?.data || error.message
        );
      }
    }
  };

  const handleAddToQuestionList = () => {
    // Validasi input soal
    if (
      !newQuestion.question ||
      !newQuestion.optionA ||
      !newQuestion.optionB ||
      !newQuestion.optionC ||
      !newQuestion.optionD ||
      !newQuestion.correctOption ||
      newQuestion.score <= 0
    ) {
      Swal.fire(
        "Error",
        "Please fill in all question fields correctly",
        "error"
      );
      return;
    }

    // Tambahkan soal ke array lokal
    setQuestions([
      ...questions,
      { ...newQuestion, id: Date.now().toString() }, // Tambahkan ID unik untuk tiap soal
    ]);

    // Reset form input soal
    setNewQuestion({
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "",
      score: 0,
    });
  };

  const handleSubmitQuestions = async () => {
    const token = localStorage.getItem("token");

    // Validasi apakah ada soal yang ditambahkan
    if (questions.length === 0) {
      Swal.fire("Error", "No questions to submit", "error");
      return;
    }

    const questionData = {
      subject, // Ubah sesuai input pengguna
      code, // Ubah sesuai input pengguna
      questions,
    };

    try {
      await axios.post(
        "https://jokicbt4.vercel.app/api/questions/create",
        questionData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      Swal.fire("Success", "Questions submitted successfully", "success");

      // Reset daftar soal setelah submit
      setQuestions([]);
    } catch (error) {
      Swal.fire("Error", "Failed to submit questions", "error");
      console.error(
        "Error submitting questions:",
        error.response?.data || error.message
      );
    }
  };

  const handleDeleteQuestion = async (code) => {
    console.log("menghapus question dengan code : ", code);
    const token = localStorage.getItem("token");
    const result = await Swal.fire({
      title: "Apakah Anda yakin?",
      text: "Anda tidak akan dapat mengembalikan ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, hapus!",
      cancelButtonText: "Batal",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://jokicbt4.vercel.app/api/questions/${code}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        Swal.fire("Success", "Question deleted successfully", "success");
        setQuestions((prevUsers) =>
          prevUsers.filter((question) => question.code !== code)
        );

        fetchQuestions();
      } catch (error) {
        Swal.fire("Error", "Failed to delete question", "error");
        console.error("Error deleting question", error);
      }
    }
  };

  return (
    <div>
      <Header />
      <Container style={{ marginTop: "20px" }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <UserManagement
              users={users}
              newUser={newUser}
              setNewUser={setNewUser}
              handleAddUser={handleAddUser}
              handleDeleteUser={handleDeleteUser}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <QuestionManagement
              subject={subject}
              setSubject={setSubject}
              code={code}
              setCode={setCode}
              questions={questions}
              setQuestions={setQuestions}
              newQuestion={newQuestion}
              setNewQuestion={setNewQuestion}
              handleAddToQuestionList={handleAddToQuestionList}
              handleSubmitQuestions={handleSubmitQuestions}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default AdminDashboard;
