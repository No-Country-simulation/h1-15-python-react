import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  doctorInfo: null,
};

const doctorSlice = createSlice({
  name: "doctor",
  initialState,
  reducers: {
    setDoctorInfo: (state, action) => {
      state.doctorInfo = action.payload;
    },
  },
});

export const { setDoctorInfo } = doctorSlice.actions;
export default doctorSlice.reducer;
