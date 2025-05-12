// src/slices/studentSlice.js
import { createSlice } from '@reduxjs/toolkit';

const studentSlice = createSlice({
  name: 'students',
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    setStudents: (state, action) => {
      state.list = action.payload;
    },
    addStudent: (state, action) => {
      state.list.push(action.payload);
    },
    updateStudent: (state, action) => {
      state.list = state.list.map(student =>
        student.id === action.payload.id ? action.payload : student
      );
    },
    deleteStudent: (state, action) => {
      state.list = state.list.filter(student => student.id !== action.payload);
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setStudents,
  addStudent,
  updateStudent,
  deleteStudent,
  setLoading,
  setError,
} = studentSlice.actions;

export default studentSlice.reducer;
