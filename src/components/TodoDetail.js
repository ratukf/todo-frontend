import React, { useEffect, useState } from "react";
import {
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  RadioGroup,
  FormControl,
  FormControlLabel,
  Radio,
  Typography,
} from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DeleteTodo } from "./DeleteTodo";
import { useDeleteTodo, useTodo, useUpdateStatus } from "../hooks/useTodo";
import { TodoStatusChips } from "./TodoStatusChip";

const TodoDetail = ({ id, isOpen, handleClose }) => {
  const {
    data: todo,
    isLoading,
    isError,
    error,
  } = useTodo(isOpen ? id : null, { enabled: !!id && isOpen }); // Fetch only when dialog is open

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState("");

  const deleteMutation = useDeleteTodo();
  const updateStatusMutation = useUpdateStatus();

  const status = [
    { label: "On Going", value: "on_going" },
    { label: "Problem", value: "problem" },
    { label: "Completed", value: "completed" },
    { label: "Cancel", value: "created" },
  ];

  const handleDelete = () => {
    setIsDeleteOpen(false);
    handleClose();
    deleteMutation.mutate(id);
  };

  const handleUpdateStatus = (statusKey) => {
    setUpdatedStatus(statusKey);
    updateStatusMutation.mutate({ id, statusKey });
  };

  // Reset updatedStatus when dialog is closed
  useEffect(() => {
    if (!isOpen) {
      setUpdatedStatus("");
    }
  }, [isOpen]);

  return (
    <>
      <Dialog open={isOpen} onClose={handleClose}>
        <DialogContent>
          {isLoading && <div>Loading...</div>}
          {isError && <div>Error: {error.message}</div>}
          {todo && (
            <>
              {/* To Do Detail  */}
              <div>
                <h2>Todo Detail</h2>
                <p>Title: {todo.title}</p>
                <TodoStatusChips data={todo} />
                {todo.problem_desc && (
                  <p>Problem Description: {todo.problem_desc}</p>
                )}
              </div>

              {/* Update Status */}
              <FormControl>
                <Typography variant="subtitle1" gutterBottom>
                  Update Status:
                </Typography>
                <RadioGroup
                  aria-labelledby="status-radio-group"
                  name="radio-buttons-group"
                  value={updatedStatus}
                  onChange={(e) => setUpdatedStatus(e.target.value)}
                >
                  {status
                    .filter((stat) => !todo?.[stat.value])
                    .map((stat) => (
                      <FormControlLabel
                        key={stat.value}
                        value={stat.value}
                        control={<Radio />}
                        label={stat.label}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </>
          )}
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
            }}
          >
            Close
          </Button>
          {/* Show Update Status button when updatedStatus is set */}
          {updatedStatus ? (
            <Button
              onClick={() => {
                handleClose();
                handleUpdateStatus(updatedStatus);
              }}
              variant="contained"
            >
              Update Status
            </Button>
          ) : (
            <IconButton onClick={() => setIsDeleteOpen(true)} color="error">
              <Delete />
            </IconButton>
          )}
        </DialogActions>
      </Dialog>

      {/* Delete todo pop-up */}
      <DeleteTodo
        isOpen={isDeleteOpen}
        handleClose={() => setIsDeleteOpen(false)}
        onDelete={handleDelete}
      />
    </>
  );
};

export { TodoDetail };
