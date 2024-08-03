import { createSlice } from '@reduxjs/toolkit';

const languageSlice = createSlice({
  name: 'language',
  initialState: false,
  reducers: {
    setLanguageData: (state, action) => {
      return action.payload;
    },
  },
});

export const { setLanguageData } = languageSlice.actions;

export default languageSlice.reducer;
