import { Chip, Stack } from "@mui/material";

const TodoStatusChips = ({ todo, data }) => {
  const source = data || todo;
  if (!source) return null;

  const statusKeys = ["on_going", "problem", "completed"];
  const activeStatuses = statusKeys.filter((key) => source[key]);

  const statusMap = {
    on_going: { label: "On Going", color: "success" },
    problem: { label: "Problem", color: "error" },
    completed: { label: "Completed", color: "primary" },
  };

  // Only show chips when status is on_going, problem, or completed
  if (activeStatuses.length === 0) return null;

  return (
    <Stack direction="row" spacing={1}>
      {activeStatuses.map((status) => (
        <Chip
          key={status}
          label={statusMap[status].label}
          color={statusMap[status].color}
          size="small"
        />
      ))}
    </Stack>
  );
};

export { TodoStatusChips };
