import { createSlice } from "@reduxjs/toolkit";
import {
  getIncidentTypes, getLocations,
  getTroubles, getWorkTypes, postTrouble,
} from "./dataThunk";

const initialState = {
  troubles: [],
  incident_types: [],
  work_types: [],
  locations: [],
  troublesLoading: false,
  locationsLoading: false,
  createTroubleLoading: false,
  troubleCreatedMessage: '',
  troubleCreatedErrorMessage: '',
  troublesTabs: [],
  page_size: 10,
  troubleCreated: false,
  troubleNotCreated: false,
};

const DataSlice = createSlice({
  name: "data", initialState,
  reducers: {
    resetTroubleCreated: state => {
      state.troubleCreated = false;
      state.troubleNotCreated = false;
    },
  },
  extraReducers: (builder) => {
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
    
    builder.addCase(postTrouble.pending, (state) => {
      state.createTroubleLoading = true;
    });
    builder.addCase(postTrouble.fulfilled, (state, { payload: res }) => {
      state.createTroubleLoading = false;
      state.troubleCreated = true;
    });
    builder.addCase(postTrouble.rejected, (state) => {
      state.createTroubleLoading = false;
      state.troubleNotCreated = true;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const { resetTroubleCreated } = DataSlice.actions;
