import { createSlice } from "@reduxjs/toolkit";
import {
  addLocation,
  deleteTrouble,
  editCause,
  editComment,
  editSideAccident,
  editSolution,
  editWorkStatus, getAccidentTypes,
  getCauses,
  getCities,
  getDistricts, getHouses,
  getIncidentTypes,
  getLocations,
  getRegions,
  getSideAccidentStatuses,
  getStreets,
  getTrouble,
  getTroubles,
  getWorkers,
  getWorkStatuses,
  getWorkTypes,
  postTrouble,
} from "./dataThunk";

const initialState = {
  troubles: [],
  trouble: null,
  regions: [],
  cities: [],
  districts: [],
  streets: [],
  houses: [],
  incident_types: [],
  work_types: [],
  locations: [],
  sideAccidentStatuses: [],
  workStatuses: [],
  causes: [],
  workers: [],
  accidentTypes: [],
  troublesLoading: false,
  troubleLoading: false,
  regionsLoading: false,
  citiesLoading: false,
  districtsLoading: false,
  streetsLoading: false,
  housesLoading: false,
  locationsLoading: false,
  createTroubleLoading: false,
  editSolutionLoading: false,
  editSideAccidentLoading: false,
  editWorkStatusLoading: false,
  editCommentLoading: false,
  editCauseLoading: false,
  incidentTypesLoading: false,
  getSideAccidentStatusesLoading: false,
  getWorkStatusesLoading: false,
  getCausesLoading: false,
  getWorkersLoading: false,
  accidentTypesLoading: false,
  addLocationLoading: false,
  deleteTroubleLoading: false,
  successMessage: '',
  errorMessage: '',
  troublesTabs: [],
  page_size: 10,
};

const DataSlice = createSlice({
  name: "data",
  initialState,
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
    builder.addCase(getTroubles.rejected, (state, { payload: err }) => {
      state.troublesLoading = false;
      state.errorMessage = err;
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
    
    builder.addCase(getRegions.pending, (state) => {
      state.regionsLoading = true;
    });
    builder.addCase(getRegions.fulfilled, (state, { payload: res }) => {
      state.regions = res || [];
      state.regionsLoading = false;
    });
    builder.addCase(getRegions.rejected, (state) => {
      state.regionsLoading = false;
    });
    
    builder.addCase(getCities.pending, (state) => {
      state.citiesLoading = true;
    });
    builder.addCase(getCities.fulfilled, (state, { payload: res }) => {
      state.cities = res || [];
      state.citiesLoading = false;
    });
    builder.addCase(getCities.rejected, (state) => {
      state.citiesLoading = false;
    });
    
    builder.addCase(getDistricts.pending, (state) => {
      state.districtsLoading = true;
    });
    builder.addCase(getDistricts.fulfilled, (state, { payload: res }) => {
      state.districts = res || [];
      state.districtsLoading = false;
    });
    builder.addCase(getDistricts.rejected, (state) => {
      state.districtsLoading = false;
    });
    
    builder.addCase(getStreets.pending, (state) => {
      state.streetsLoading = true;
    });
    builder.addCase(getStreets.fulfilled, (state, { payload: res }) => {
      state.streets = res || [];
      state.streetsLoading = false;
    });
    builder.addCase(getStreets.rejected, (state) => {
      state.streetsLoading = false;
    });
    
    builder.addCase(getHouses.pending, (state) => {
      state.housesLoading = true;
    });
    builder.addCase(getHouses.fulfilled, (state, { payload: res }) => {
      state.houses = res || [];
      state.housesLoading = false;
    });
    builder.addCase(getHouses.rejected, (state) => {
      state.housesLoading = false;
    });
    
    builder.addCase(getIncidentTypes.pending, (state) => {
      state.incidentTypesLoading = true;
    });
    builder.addCase(getIncidentTypes.fulfilled, (state, { payload: res }) => {
      state.incidentTypesLoading = false;
      state.incident_types = res || [];
    });
    builder.addCase(getIncidentTypes.rejected, (state) => {
      state.incidentTypesLoading = false;
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
    
    builder.addCase(getWorkStatuses.pending, (state) => {
      state.getWorkStatusesLoading = true;
    });
    builder.addCase(getWorkStatuses.fulfilled, (state, { payload: res }) => {
      state.workStatuses = res || [];
      state.getWorkStatusesLoading = false;
    });
    builder.addCase(getWorkStatuses.rejected, (state) => {
      state.getWorkStatusesLoading = false;
    });
    
    builder.addCase(getCauses.pending, (state) => {
      state.getCausesLoading = true;
    });
    builder.addCase(getCauses.fulfilled, (state, { payload: res }) => {
      state.causes = res || [];
      state.getCausesLoading = false;
    });
    builder.addCase(getCauses.rejected, (state) => {
      state.getCausesLoading = false;
    });
    
    builder.addCase(getWorkers.pending, (state) => {
      state.getWorkersLoading = true;
    });
    builder.addCase(getWorkers.fulfilled, (state, { payload: res }) => {
      state.workers = res || [];
      state.getWorkersLoading = false;
    });
    builder.addCase(getWorkers.rejected, (state) => {
      state.getWorkersLoading = false;
    });
    
    builder.addCase(getAccidentTypes.pending, (state) => {
      state.accidentTypesLoading = true;
    });
    builder.addCase(getAccidentTypes.fulfilled, (state, { payload: res }) => {
      state.accidentTypes = res || [];
      state.accidentTypesLoading = false;
    });
    builder.addCase(getAccidentTypes.rejected, (state) => {
      state.accidentTypesLoading = false;
    });
    
    builder.addCase(postTrouble.pending, (state) => {
      state.createTroubleLoading = true;
      state.successMessage = '';
      state.errorMessage = '';
    });
    builder.addCase(postTrouble.fulfilled, (state) => {
      state.createTroubleLoading = false;
      state.successMessage = 'Новость успешно создана';
    });
    builder.addCase(postTrouble.rejected, (state, { payload: err }) => {
      state.createTroubleLoading = false;
      state.errorMessage = err;
    });
    
    builder.addCase(editSolution.pending, (state) => {
      state.editSolutionLoading = true;
      state.successMessage = '';
      state.errorMessage = '';
    });
    builder.addCase(editSolution.fulfilled, (state) => {
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
    builder.addCase(editSideAccident.fulfilled, (state) => {
      state.editSideAccidentLoading = false;
      state.successMessage = 'Сторона аварии изменена';
    });
    builder.addCase(editSideAccident.rejected, (state, { payload: res }) => {
      state.editSideAccidentLoading = false;
      state.errorMessage = res;
    });
    
    builder.addCase(editWorkStatus.pending, (state) => {
      state.editWorkStatusLoading = true;
      state.successMessage = '';
      state.errorMessage = '';
    });
    builder.addCase(editWorkStatus.fulfilled, (state) => {
      state.editWorkStatusLoading = false;
      state.successMessage = 'Статус изменён';
    });
    builder.addCase(editWorkStatus.rejected, (state, { payload: res }) => {
      state.editWorkStatusLoading = false;
      state.errorMessage = res;
    });
    
    builder.addCase(editCause.pending, (state) => {
      state.editCauseLoading = true;
      state.successMessage = '';
      state.errorMessage = '';
    });
    builder.addCase(editCause.fulfilled, (state) => {
      state.editCauseLoading = false;
      state.successMessage = 'Причина изменена';
    });
    builder.addCase(editCause.rejected, (state, { payload: res }) => {
      state.editCauseLoading = false;
      state.errorMessage = res;
    });
    
    builder.addCase(editComment.pending, (state) => {
      state.editCommentLoading = true;
      state.successMessage = '';
      state.errorMessage = '';
    });
    builder.addCase(editComment.fulfilled, (state) => {
      state.editCommentLoading = false;
      state.successMessage = 'Комментарий сохранён';
    });
    builder.addCase(editComment.rejected, (state, { payload: res }) => {
      state.editCommentLoading = false;
      state.errorMessage = res;
    });
    
    builder.addCase(addLocation.pending, (state) => {
      state.addLocationLoading = true;
    });
    builder.addCase(addLocation.fulfilled, (state) => {
      state.addLocationLoading = false;
      state.successMessage = 'Локация создана';
    });
    builder.addCase(addLocation.rejected, (state, { payload: res }) => {
      state.addLocationLoading = false;
      state.errorMessage = res;
    });
    
    builder.addCase(deleteTrouble.pending, (state) => {
      state.deleteTroubleLoading = true;
    });
    builder.addCase(deleteTrouble.fulfilled, (state) => {
      state.deleteTroubleLoading = false;
      state.successMessage = 'Авария успешно удалена';
    });
    builder.addCase(deleteTrouble.rejected, (state, { payload: res }) => {
      state.deleteTroubleLoading = false;
      state.errorMessage = res;
    });
  },
});

export const dataReducer = DataSlice.reducer;
export const { resetAlertMessage } = DataSlice.actions;
