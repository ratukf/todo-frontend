import "./App.css";
import { Container, Grid, Typography } from "@mui/material";
import { TodosList } from "./components/TodosList";
import { AddTodo } from "./components/AddTodo";
import { useState } from "react";
import { TodoDetail } from "./components/TodoDetail";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

dayjs.extend(advancedFormat);

function App() {
  const [id, setId] = useState(null);
  const [isTodoDetailOpen, setIsTodoDetailOpen] = useState(false);
  const date = dayjs();
  const formatted = date.format("ddd Do, MMMM");
  const [weekdayDate, month] = formatted.split(", ");

  const handleOpenTodoDetail = (id) => {
    setId(id);
    setIsTodoDetailOpen(true);
  };

  return (
    <Container className="App">
      <Grid container direction="column" alignItems="center" spacing={5}>
        <Typography
          variant="h2"
          sx={{ my: 2, fontWeight: "900", color: "black" }}
        >
          {weekdayDate}, <span style={{ color: "#888" }}>{month}</span>
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
