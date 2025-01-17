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
import AddQuestion from "./AddQuestions";

const QuestionManagement = ({
  subject,
  setSubject,
  code,
  setCode,
  questions,
  newQuestion,
  setNewQuestion,
  handleAddToQuestionList,
  handleSubmitQuestions,
  handleDeleteQuestion,
}) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Question Management
      </Typography>

      <List>
        {Array.isArray(questions) && questions.length > 0 ? (
          questions.map((question) => (
            <ListItem
              key={question.code}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteQuestion(question.code)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            >
              <ListItemText
                primary={question.subject}
                secondary={"code : " + question.code}
              />
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="textSecondary">
            No questions available.
          </Typography>
        )}
      </List>
      <TextField
        label="Subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        fullWidth
        margin="dense"
      />
      <TextField
        label="Code"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        fullWidth
        margin="dense"
      />
      <Box mt={2}>
        <TextField
          label="Question"
          value={newQuestion.question}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, question: e.target.value })
          }
          fullWidth
          margin="dense"
        />
        <TextField
          label="Option A"
          value={newQuestion.optionA}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, optionA: e.target.value })
          }
          fullWidth
          margin="dense"
        />
        <TextField
          label="Option B"
          value={newQuestion.optionB}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, optionB: e.target.value })
          }
          fullWidth
          margin="dense"
        />
        <TextField
          label="Option C"
          value={newQuestion.optionC}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, optionC: e.target.value })
          }
          fullWidth
          margin="dense"
        />
        <TextField
          label="Option D"
          value={newQuestion.optionD}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, optionD: e.target.value })
          }
          fullWidth
          margin="dense"
        />
        <TextField
          label="Correct Option"
          value={newQuestion.correctOption}
          onChange={(e) =>
            setNewQuestion({ ...newQuestion, correctOption: e.target.value })
          }
          fullWidth
          margin="dense"
        />
        <TextField
          label="Score"
          type="number"
          value={newQuestion.score}
          onChange={(e) =>
            setNewQuestion({
              ...newQuestion,
              score: parseInt(e.target.value) || 0,
            })
          }
          fullWidth
          margin="dense"
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddToQuestionList}
          fullWidth
          style={{ marginBottom: "10px" }}
        >
          Add to List
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmitQuestions}
          fullWidth
        >
          Submit All Questions
        </Button>
      </Box>
      <Box mt={2}>
        <AddQuestion />
      </Box>
    </Box>
  );
};

export default QuestionManagement;
