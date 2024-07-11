import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";
import { smthIsWrongErrorMessage } from "../constants";

export const getTroubles = createAsyncThunk("data/getTroubles", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`incident_list/?page=${data.currentTab}&page_size=${data.page_size}`);
    return { ...response.data, page_size: data.page_size };
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(smthIsWrongErrorMessage);
    }
    throw e;
  }
});

export const getIncidentTypes = createAsyncThunk("data/getIncidentTypes", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`/choices/incident-types/`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(smthIsWrongErrorMessage);
    }
    throw e;
  }
});

export const getWorkTypes = createAsyncThunk("data/getWorkTypes", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`/choices/work-types/`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(smthIsWrongErrorMessage);
    }
    throw e;
  }
});

export const getLocations = createAsyncThunk("data/getLocations", async (location_type, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`http://91.210.169.237:8001/news/api/all_location_list/?type=${location_type}`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(smthIsWrongErrorMessage);
    }
    throw e;
  }
});

export const postTrouble = createAsyncThunk("data/postTrouble", async (data, {
  rejectWithValue
}) => {
  try {
    const formDataToHydra = new FormData();
    const formDataToBitrix = new FormData();
    
    for (const key in data) {
      if (['addresses', 'title', 'post_type', 'image'].includes(key)) {
        if (key === 'addresses') {
          formDataToHydra.append(key, JSON.stringify(data[key]));
        } else formDataToHydra.append(key, data[key]);
      } else formDataToBitrix.append(key, data[key]);
    }
    
    const reqToBitrix = await axiosApi.post(`incident/create/`, formDataToBitrix);
    //const reqToHydra = await axiosApi.post(`send_news_to/`, formDataToHydra);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(smthIsWrongErrorMessage);
    }
    throw e;
  }
});
