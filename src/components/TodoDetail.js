import { useEffect, useState } from "react";
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
  Stack,
  TextField,
} from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
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
  const [isEditProblemDesc, setIsEditProblemDesc] = useState(false);

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
      setIsEditProblemDesc(false);
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
                <h2>{todo.title}</h2>
                <TodoStatusChips data={todo} />
                {todo.problem_desc && (
                  <>
                    <Typography variant="body2" color="textSecondary" mt={2}>
                      Problem Description:
                    </Typography>
                    {isEditProblemDesc ? (
                      <TextField
                        id="outlined-multiline-static"
                        multiline
                        fullWidth
                        defaultValue={todo.problem_desc}
                      />
                    ) : (
                      <Typography variant="body1" mt={2} mb={2}>
                        {todo.problem_desc}{" "}
                        <IconButton
                          size="small"
                          onClick={() => setIsEditProblemDesc(true)}
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                      </Typography>
                    )}
                  </>
                )}
              </div>

              {/* Update Status */}
              <FormControl>
                <Stack direction="row" spacing={1} mb={2} alignItems={"center"}>
                  <Typography variant="body2" color="textSecondary">
                    Update status:
                  </Typography>
                  <RadioGroup
                    aria-labelledby="status-radio-group"
                    name="radio-buttons-group"
                    value={updatedStatus}
                    onChange={(e) => setUpdatedStatus(e.target.value)}
                    row
                  >
                    {status
                      .filter((stat) => !todo?.[stat.value])
                      .map((stat) => (
                        <FormControlLabel
                          key={stat.value}
                          value={stat.value}
                          control={<Radio />}
                          label={stat.label}
                          sx={{
                            "& .MuiFormControlLabel-label": {
                              typography: "body2",
                              color: "text.secondary",
                            },
                          }}
                        />
                      ))}
                  </RadioGroup>
                </Stack>
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
          {updatedStatus || isEditProblemDesc ? (
            <Button
              onClick={() => {
                handleClose();
                handleUpdateStatus(updatedStatus);
              }}
              variant="contained"
            >
              Update
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
