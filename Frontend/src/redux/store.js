import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slice/langSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
  },
});

