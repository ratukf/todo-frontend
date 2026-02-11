import "./App.css";
import { Container, IconButton, Typography } from "@mui/material";
import { TodosList } from "./components/TodosList";
import { AddCircle } from "@mui/icons-material";
import { AddTodo } from "./components/AddTodo";
import { useState } from "react";
import { TodoDetail } from "./components/TodoDetail";

function App() {
  const [isAddTodoOpen, setIsAddTodoOpen] = useState(false);
  const [id, setId] = useState(null);
  const [isTodoDetailOpen, setIsTodoDetailOpen] = useState(false);

  const handleOpenAddTodo = () => {
    setIsAddTodoOpen(true);
  };

  const handleCloseAddTodo = () => {
    setIsAddTodoOpen(false);
  };

  const handleOpenTodoDetail = (id) => {
    setId(id);
    setIsTodoDetailOpen(true);
  };

  return (
    <div className="App">
      <Container>
        <Typography variant="h4" sx={{ my: 2 }}>
          Todo List
        </Typography>

        {/* List of todos */}
        <TodosList handleClick={handleOpenTodoDetail} />

        {/* Button to open Add Todo dialog */}
        <IconButton onClick={handleOpenAddTodo}>
          <AddCircle />
        </IconButton>
      </Container>

      {/* Add Todo dialog */}
      <AddTodo isOpen={isAddTodoOpen} handleClose={handleCloseAddTodo} />

      {/* Todo detail dialog */}
      <TodoDetail
        id={id}
        isOpen={isTodoDetailOpen}
        handleClose={() => setIsTodoDetailOpen(false)}
      />
    </div>
  );
}

export default App;
