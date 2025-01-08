import { createAsyncThunk } from '@reduxjs/toolkit'; 


export const fetchTasks = createAsyncThunk(
  'tasks/fetchAll',
  async (_, thunkAPI) => {
    try {
      const res = await axios.get('/tasks'); // pobieranie zadań
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message); // Obsługa błędów
    }
  }
);

// POST @ /tasks
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (text, thunkAPI) => {
    try {
      const response = await axios.post('/tasks', { text }); // dodawania zadania
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message); // Obsługa błędów
    }
  }
);

// DELETE @ /tasks/:id
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (taskId, thunkAPI) => {
    try {
      const response = await axios.delete(`/tasks/${taskId}`); //  usuwanie zadania
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(e.message); // Obsługa błędów
    }
  }
);
