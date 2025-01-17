import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Container,
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const AddQuestion = () => {
  const [subject, setSubject] = useState("Informatika");
  const [code, setCode] = useState("INF101");
  const [questions, setQuestions] = useState([
    {
      question: "",
      optionA: "",
      optionB: "",
      optionC: "",
      optionD: "",
      correctOption: "",
      score: 5,
    },
  ]);

  const handleQuestionChange = (index, field, value) => {
    const newQuestions = [...questions];
    newQuestions[index][field] = value;
    setQuestions(newQuestions);
  };

  const addQuestionField = () => {
    setQuestions([
      ...questions,
      {
        question: "",
        optionA: "",
        optionB: "",
        optionC: "",
        optionD: "",
        correctOption: "",
        score: 5,
      },
    ]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Get auth token from localStorage
    const token = localStorage.getItem("authToken");

    if (!token) {
      alert("No authentication token found. Please log in.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/questions/create",
        { subject, code, questions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      alert("Questions added successfully!");
      // Reset form or navigate to another page
      setQuestions([
        {
          question: "",
          optionA: "",
          optionB: "",
          optionC: "",
          optionD: "",
          correctOption: "",
          score: 5,
        },
      ]);
    } catch (error) {
      console.error("Error adding questions:", error);
      alert("Failed to add questions. Please try again.");
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add Questions
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="Course Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          </Box>

          {questions.map((q, index) => (
            <Box
              key={index}
              sx={{ mb: 3, p: 2, border: "1px solid #ddd", borderRadius: 2 }}
            >
              <Typography variant="h6">Question {index + 1}</Typography>
              <TextField
                fullWidth
                label="Question"
                value={q.question}
                onChange={(e) =>
                  handleQuestionChange(index, "question", e.target.value)
                }
                sx={{ mb: 2 }}
                required
              />
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                  mb: 2,
                }}
              >
                <TextField
                  label="Option A"
                  value={q.optionA}
                  onChange={(e) =>
                    handleQuestionChange(index, "optionA", e.target.value)
                  }
                  required
                />
                <TextField
                  label="Option B"
                  value={q.optionB}
                  onChange={(e) =>
                    handleQuestionChange(index, "optionB", e.target.value)
                  }
                  required
                />
                <TextField
                  label="Option C"
                  value={q.optionC}
                  onChange={(e) =>
                    handleQuestionChange(index, "optionC", e.target.value)
                  }
                  required
                />
                <TextField
                  label="Option D"
                  value={q.optionD}
                  onChange={(e) =>
                    handleQuestionChange(index, "optionD", e.target.value)
                  }
                  required
                />
              </Box>
              <Box sx={{ display: "flex", gap: 2 }}>
                <FormControl fullWidth>
                  <InputLabel>Correct Option</InputLabel>
                  <Select
                    value={q.correctOption}
                    label="Correct Option"
                    onChange={(e) =>
                      handleQuestionChange(
                        index,
                        "correctOption",
                        e.target.value
                      )
                    }
                    required
                  >
                    <MenuItem value="A">Option A</MenuItem>
                    <MenuItem value="B">Option B</MenuItem>
                    <MenuItem value="C">Option C</MenuItem>
                    <MenuItem value="D">Option D</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  type="number"
                  label="Score"
                  value={q.score}
                  onChange={(e) =>
                    handleQuestionChange(index, "score", Number(e.target.value))
                  }
                  InputProps={{ inputProps: { min: 1 } }}
                  required
                />
              </Box>
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
            <Button
              variant="outlined"
              color="secondary"
              onClick={addQuestionField}
            >
              Add Another Question
            </Button>
            <Button type="submit" variant="contained" color="primary">
              Submit Questions
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AddQuestion;
