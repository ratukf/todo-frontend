import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  addTodo,
  deleteTodo,
  getOneTodo,
  getTodos,
  updateStatus,
} from "../services/todoService";

// Hook to fetch all todos with optional search
const useTodos = (search) => {
  return useQuery({
    queryKey: ["todos", search || ""],
    queryFn: () => getTodos(search),
    keepPreviousData: true, // Keep previous data while fetching new data
  });
};

// Hook to add a new todo
const useAddTodo = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ title }) => addTodo(title),
    // On success, invalidate the todos query to refetch the list
    onSuccess: () => queryClient.invalidateQueries(["todos"]),
  });
};

// Hook to fetch a single todo by ID
const useTodo = (id) => {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => getOneTodo(id),
    enabled: !!id, // Only run the query if id is provided
  });
};

// Hook to delete a todo by ID
const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id) => deleteTodo(id),
    // When success, remove the specific todo query and invalidate the todos list
    onSuccess: (_data, id) => {
      queryClient.removeQueries({ queryKey: ["todo", id] });
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "todos",
      });
    },
  });
};

// Hook to update the status of a todo
const useUpdateStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, statusKey, problemDesc }) => {
      const payload = {};

      // Hanya proses kalau statusKey valid
      if (statusKey) {
        if (statusKey === "problem") {
          // Kalau problem, kirim problem true + problem_desc
          payload.problem = true;
          payload.problem_desc = problemDesc || null;
        } else {
          // Kalau status lain, set status true & hapus problem_desc
          payload[statusKey] = true;
          payload.problem = false;
          payload.problem_desc = null;
        }
      } else if (problemDesc) {
        // Kalau tidak pilih status, tapi isi problem_desc
        payload.problem = true;
        payload.problem_desc = problemDesc;
      }

      return updateStatus(id, payload);
    },
    // When success, invalidate both the todos list and the specific todo query
    onSuccess: (_data, variables) => {
      const { id } = variables;
      queryClient.invalidateQueries({
        predicate: (query) => query.queryKey[0] === "todos", // Invalidate todos list
      });
      queryClient.invalidateQueries(["todo", id]);
    },
  });
};

export { useTodos, useAddTodo, useTodo, useDeleteTodo, useUpdateStatus };
