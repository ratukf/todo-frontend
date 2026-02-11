import {
  Card,
  Divider,
  List,
  ListItem,
  ListItemButton,
  Stack,
  TextField,
  Typography,
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
    <Card
      sx={{
        height: 400,
        width: "100%",
        overflow: "auto",
        p: 2,
      }}
    >
      {/* Search Input */}
      <TextField
        label="Search Todos"
        fullWidth
        value={searchInput}
        onChange={handleSearchChange}
        onKeyDown={handleEnterKey}
        sx={{ mb: 2 }}
      />

      {/* Todos list */}
      <List>
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error: {error.message}</div>}
        {todos?.map((todo, index) => (
          <>
            <ListItem key={todo.id} disablePadding>
              <ListItemButton onClick={() => handleClick(todo.id)}>
                <Stack
                  direction="row"
                  alignItems="center"
                  sx={{ width: "100%", py: 2 }}
                >
                  {/* Index & Title */}
                  <div
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {index + 1}
                    </Typography>
                    {todo.completed === true ? (
                      <Typography
                        variant="body1"
                        sx={{ textDecoration: "line-through" }}
                      >
                        {todo.title}
                      </Typography>
                    ) : (
                      <Typography>{todo.title}</Typography>
                    )}
                  </div>

                  {/* Chip*/}
                  <div style={{ marginLeft: "auto" }}>
                    <TodoStatusChips todo={todo} />
                  </div>
                </Stack>
              </ListItemButton>
            </ListItem>
            <Divider />
          </>
        ))}
      </List>
    </Card>
  );
};

export { TodosList };
