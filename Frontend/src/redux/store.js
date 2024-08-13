import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slice/langSlice";
import darkModeReducer from "./slice/darkModeSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    darkMode: darkModeReducer,
  },
});
