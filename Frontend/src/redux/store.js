import { configureStore } from "@reduxjs/toolkit";
import languageReducer from "./slice/langSlice";
import patientReducer from "./slice/patientSlice";
import doctorReducer from "./slice/doctorSlice";

export const store = configureStore({
  reducer: {
    language: languageReducer,
    patients: patientReducer,
    doctor: doctorReducer,
  },
});
