import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  medicalHistory: [],
  selectedPatient: null,
  patients: [],
};

const patientSlice = createSlice({
  name: "patients",
  initialState,
  reducers: {
    setMedicalHistory: (state, action) => {
      state.medicalHistory = action.payload;
    },
    setSelectedPatient: (state, action) => {
      state.selectedPatient = action.payload;
    },
    setPatients: (state, action) => {
      state.patients = action.payload;
    },
  },
});

export const { setMedicalHistory, setSelectedPatient, setPatients } =
  patientSlice.actions;
export default patientSlice.reducer;
