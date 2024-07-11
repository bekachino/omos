import { createSlice } from "@reduxjs/toolkit";
import {
  editSideAccident,
  editSolution,
  getIncidentTypes, getLocations, getSideAccidentStatuses, getTrouble,
  getTroubles, getWorkTypes, postTrouble,
} from "./dataThunk";

const initialState = {
  troubles: [],
  trouble: null,
  incident_types: [],
  work_types: [],
  locations: [],
  sideAccidentStatuses: [],
  troublesLoading: false,
  troubleLoading: false,
  locationsLoading: false,
  createTroubleLoading: false,
  editSolutionLoading: false,
  editSideAccidentLoading: false,
  getSideAccidentStatusesLoading: false,
  successMessage: '',
  errorMessage: '',
  troublesTabs: [],
  page_size: 10,
};

const DataSlice = createSlice({
  name: "data", initialState,
  reducers: {
    resetAlertMessage: state => {
      state.successMessage = false;
      state.errorMessage = false;
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
    })
    
    builder.addCase(getTrouble.pending, (state) => {
      state.troubleLoading = true;
    });
    builder.addCase(getTrouble.fulfilled, (state, { payload: res }) => {
      state.trouble = res || null;
      state.troubleLoading = false;
    });
    builder.addCase(getTrouble.rejected, (state) => {
      state.troubleLoading = false;
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
    
    builder.addCase(getSideAccidentStatuses.pending, (state) => {
      state.getSideAccidentStatusesLoading = true;
    });
    builder.addCase(getSideAccidentStatuses.fulfilled, (state, { payload: res }) => {
      state.sideAccidentStatuses = res || [];
      state.getSideAccidentStatusesLoading = false;
    });
    builder.addCase(getSideAccidentStatuses.rejected, (state) => {
      state.getSideAccidentStatusesLoading = false;
    });
    
    builder.addCase(postTrouble.pending, (state) => {
      state.createTroubleLoading = true;
      state.successMessage = '';
      state.errorMessage = '';
    });
    builder.addCase(postTrouble.fulfilled, (state, { payload: res }) => {
      state.createTroubleLoading = false;
      state.successMessage = 'Новость успешно создана';
    });
    builder.addCase(postTrouble.rejected, (state, { payload: res }) => {
      state.createTroubleLoading = false;
      state.errorMessage = res;
    });
    
    builder.addCase(editSolution.pending, (state) => {
      state.editSolutionLoading = true;
      state.successMessage = '';
      state.errorMessage = '';
    });
    builder.addCase(editSolution.fulfilled, (state, { payload: res }) => {
      state.editSolutionLoading = false;
      state.successMessage = 'Решение изменено';
    });
    builder.addCase(editSolution.rejected, (state, { payload: res }) => {
      state.editSolutionLoading = false;
      state.errorMessage = res;
    });
    
    builder.addCase(editSideAccident.pending, (state) => {
      state.editSideAccidentLoading = true;
      state.successMessage = '';
      state.errorMessage = '';
    });
    builder.addCase(editSideAccident.fulfilled, (state, { payload: res }) => {
      state.editSideAccidentLoading = false;
      state.successMessage = 'Сторона аварии изменена';
    });
    builder.addCase(editSideAccident.rejected, (state, { payload: res }) => {
      state.editSideAccidentLoading = false;
      state.errorMessage = res;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const { resetAlertMessage } = DataSlice.actions;
