import { createSlice } from "@reduxjs/toolkit";
import {
  getTroubles,
} from "./dataThunk";

const initialState = {
  troubles: [],
  tradesLoading: false,
  troubleCreatedMessage: '',
  troubleCreatedErrorMessage: '',
};

const DataSlice = createSlice({
  name: "data", initialState, reducers: {}, extraReducers: (builder) => {
    builder.addCase(getTroubles.pending, (state) => {
      state.tradesLoading = true;
    });
    builder.addCase(getTroubles.fulfilled, (state, { payload: res }) => {
      state.troubles = res || [];
      state.tradesLoading = false;
    });
    builder.addCase(getTroubles.rejected, (state, { payload: error }) => {
      state.tradesLoading = false;
      state.tradesCreatedErrorMessage = error;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {} = DataSlice.actions;
