import "./App.css";
import { Container, Grid, Typography } from "@mui/material";
import { TodosList } from "./components/TodosList";
import { AddTodo } from "./components/AddTodo";
import { useState } from "react";
import { TodoDetail } from "./components/TodoDetail";

function App() {
  const [id, setId] = useState(null);
  const [isTodoDetailOpen, setIsTodoDetailOpen] = useState(false);

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

        {/* Add Todo Textfield */}
        <AddTodo />

        {/* List of todos */}
        <TodosList handleClick={handleOpenTodoDetail} />
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
