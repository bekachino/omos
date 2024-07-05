import { createSlice } from "@reduxjs/toolkit";
import {
  getTroubles,
} from "./dataThunk";

const initialState = {
  troubles: [], troubleCreatedMessage: '', troubleCreatedErrorMessage: '',
};

const DataSlice = createSlice({
  name: "data", initialState, reducers: {}, extraReducers: (builder) => {
    builder.addCase(getTroubles.pending, (state) => {
    });
    builder.addCase(getTroubles.fulfilled, (state, { payload: res }) => {
    });
    builder.addCase(getTroubles.rejected, (state, { payload: error }) => {
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {} = DataSlice.actions;
