import { createSlice } from "@reduxjs/toolkit";

const initialDarkMode = JSON.parse(localStorage.getItem("darkMode"));

const darkModeSlice = createSlice({
  name: "darkMode",
  initialState: initialDarkMode || false, // usa el valor guardado o false por defecto
  reducers: {
    toggleDarkMode: (state) => !state,
    setDarkMode: (state, action) => action.payload,
  },
});

export const { toggleDarkMode, setDarkMode } = darkModeSlice.actions;

export default darkModeSlice.reducer;
