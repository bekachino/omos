import { createSlice } from "@reduxjs/toolkit";
import {
  getIncidentTypes, getLocations,
  getTroubles, getWorkTypes,
} from "./dataThunk";

const initialState = {
  troubles: [],
  incident_types: [],
  work_types: [],
  locations: [],
  troublesLoading: false,
  locationsLoading: false,
  troubleCreatedMessage: '',
  troubleCreatedErrorMessage: '',
  troublesTabs: [],
  page_size: 10,
};

const DataSlice = createSlice({
  name: "data", initialState, reducers: {}, extraReducers: (builder) => {
    builder.addCase(getTroubles.pending, (state) => {
      state.troublesLoading = true;
    });
    builder.addCase(getTroubles.fulfilled, (state, { payload: res }) => {
      const tabsCount = Math.ceil(res?.count / state.page_size);
      state.troubles = res?.results || [];
      state.troublesLoading = false;
      state.troublesTabs = Array.from({ length: tabsCount }, (_, index) => index + 1);
    });
    builder.addCase(getTroubles.rejected, (state) => {
      state.troublesLoading = false;
    });
    
    builder.addCase(getIncidentTypes.pending, () => {
    });
    builder.addCase(getIncidentTypes.fulfilled, (state, { payload: res }) => {
      state.incident_types = res || [];
    });
    builder.addCase(getIncidentTypes.rejected, () => {
    });
    
    builder.addCase(getWorkTypes.pending, () => {
    });
    builder.addCase(getWorkTypes.fulfilled, (state, { payload: res }) => {
      state.work_types = res || [];
    });
    builder.addCase(getWorkTypes.rejected, () => {
    });
    
    builder.addCase(getLocations.pending, (state) => {
      state.locations = [];
      state.locationsLoading = true;
    });
    builder.addCase(getLocations.fulfilled, (state, { payload: res }) => {
      state.locations = res || [];
      state.locationsLoading = false;
    });
    builder.addCase(getLocations.rejected, (state) => {
      state.locationsLoading = false;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const {} = DataSlice.actions;
