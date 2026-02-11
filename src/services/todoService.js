import axios from "axios";

const API_URL = "http://localhost:5000/api/todos";

// Fetch all todos, with optional search query
const getTodos = async (search) => {
  const res = await axios.get(`${API_URL}?search=${search || ""}`);
  return res.data;
};

// Fetch a single todo by ID
const getOneTodo = async (id) => {
  const res = await axios.get(`${API_URL}/${id}`);
  return res.data;
};

// Add a new todo
const addTodo = async (title) => {
  const res = await axios.post(API_URL, { title });
  return res.data;
};

// Update the status of a todo
const updateStatus = async (id, updatedTodo) => {
  const res = await axios.patch(`${API_URL}/${id}`, updatedTodo);
  return res.data;
};

// Delete a todo by ID
const deleteTodo = async (id) => {
  const res = await axios.delete(`${API_URL}/${id}`);
  return res.status;
};

export { getTodos, getOneTodo, addTodo, updateStatus, deleteTodo };
