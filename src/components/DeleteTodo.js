import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

const DeleteTodo = ({ isOpen, handleClose, onDelete }) => {
  return (
    <Dialog open={isOpen} onClose={handleClose}>
      <DialogTitle>Delete Todo</DialogTitle>
      <DialogContent>Are you sure you want to delete this todo?</DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" onClick={onDelete}>
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export { DeleteTodo };
