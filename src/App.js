import "./App.css";
import { Container, Grid, IconButton, Typography } from "@mui/material";
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
    <Container className="App">
      <Grid container direction="column" alignItems="center" spacing={5}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Todo List
        </Typography>

        {/* Add Todo dialog */}
        <AddTodo isOpen={isAddTodoOpen} handleClose={handleCloseAddTodo} />

        {/* List of todos */}
        <TodosList handleClick={handleOpenTodoDetail} />

        {/* Button to open Add Todo dialog */}
        <IconButton onClick={handleOpenAddTodo}>
          <AddCircle />
        </IconButton>
      </Grid>

      {/* Todo detail dialog */}
      <TodoDetail
        id={id}
        isOpen={isTodoDetailOpen}
        handleClose={() => setIsTodoDetailOpen(false)}
      />
    </Container>
  );
}

export default App;
