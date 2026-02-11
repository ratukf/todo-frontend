import { InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useAddTodo } from "../hooks/useTodo";
import { AddCircle } from "@mui/icons-material";

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
    <>
      <TextField
        fullWidth
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAddTodo()}
        placeholder="Add new task"
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <AddCircle />
              </InputAdornment>
            ),
          },
        }}
      />
    </>
  );
};

export { AddTodo };
