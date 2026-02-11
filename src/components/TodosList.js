import {
  List,
  ListItem,
  ListItemButton,
  Paper,
  TextField,
} from "@mui/material";
import { useTodos } from "../hooks/useTodo";
import { useState } from "react";
import { TodoStatusChips } from "./TodoStatusChip";

const TodosList = ({ handleClick }) => {
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  const { data: todos, isLoading, isError, error } = useTodos(searchQuery);

  const handleSearchChange = (e) => {
    setSearchInput(e.target.value);
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      console.log("Searching for:", searchInput);
      setSearchQuery(searchInput);
    }
  };

  return (
    <Paper sx={{ height: 400, width: "100%", overflow: "auto", p: 2 }}>
      {/* Search Input */}
      <TextField
        label="Search Todos"
        fullWidth
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={handleEnterKey}
      />

      {/* Todos list */}
      <List>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        {todos?.map((todo, index) => (
          <ListItem key={todo.id} disablePadding>
            <ListItemButton onClick={() => handleClick(todo.id)}>
              <div>{index + 1}</div>
              <div>{todo.title}</div>
              <TodoStatusChips todo={todo} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export { TodosList };
