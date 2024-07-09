import { createSlice } from "@reduxjs/toolkit";
import {
  getTroubles,
} from "./dataThunk";

const initialState = {
  troubles: [],
  tradesLoading: false,
  troubleCreatedMessage: '',
  troubleCreatedErrorMessage: '',
  troublesTabs: [],
  page_size: 10,
};

const DataSlice = createSlice({
  name: "data", initialState, reducers: {}, extraReducers: (builder) => {
    builder.addCase(getTroubles.pending, (state) => {
      state.tradesLoading = true;
    });
    builder.addCase(getTroubles.fulfilled, (state, { payload: res }) => {
      const tabsCount = Math.ceil(res?.count / state.page_size);
      state.troubles = res?.results || [];
      state.tradesLoading = false;
      state.troublesTabs = Array.from({ length: tabsCount }, (_, index) => index + 1);
    });
    builder.addCase(getTroubles.rejected, (state, { payload: error }) => {
      state.tradesLoading = false;
      state.tradesCreatedErrorMessage = error;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {} = DataSlice.actions;
