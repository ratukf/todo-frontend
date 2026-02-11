import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAddTodo } from "../hooks/useTodo";

const AddTodo = ({ isOpen, handleClose }) => {
  const addTodoMutation = useAddTodo();
  const [title, setTitle] = useState("");

  const handleAddTodo = () => {
    if (!title.trim()) return; // Prevent adding empty titles
    addTodoMutation.mutate({ title, status: "pending" });
    setTitle("");
    handleClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="add-todo-dialog-title"
    >
      <DialogTitle id="add-todo-dialog-title">Add New Todo</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Todo Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleAddTodo}>Add</Button>
      </DialogActions>
    </Dialog>
  );
};

export { AddTodo };
