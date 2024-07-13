import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";
import { smthIsWrongErrorMessage } from "../constants";

export const getTroubles = createAsyncThunk("data/getTroubles", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`incident_list/?page=${data.currentTab || 1}&page_size=${data.page_size}`);
    return { ...response.data, page_size: data.page_size };
  } catch (e) {
    return rejectWithValue(smthIsWrongErrorMessage);
  }
});

export const getTrouble = createAsyncThunk("data/getTrouble", async (id, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`incidents/${id}`);
    return response.data;
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

export const getSideAccidentStatuses = createAsyncThunk("data/getSideAccidentStatuses", async (location_type, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`choices/sides/`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(smthIsWrongErrorMessage);
    }
    throw e;
  }
});

export const getWorkStatuses = createAsyncThunk("data/getWorkStatuses", async (location_type, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`choices/work-status/`);
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(smthIsWrongErrorMessage);
    }
    throw e;
  }
});

export const getCauses = createAsyncThunk("data/getCauses", async (location_type, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`choices/causes/`);
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
    const formDataToBitrix = new FormData();
    
    for (const key in data) {
      if (key === 'addresses') {
        formDataToBitrix.append(key, JSON.stringify(data[key]));
      } else formDataToBitrix.append(key, data[key]);
    }
    
    await axiosApi.post(`incident/create/`, formDataToBitrix);
  } catch (e) {
    return rejectWithValue(smthIsWrongErrorMessage);
  }
});

export const editSolution = createAsyncThunk("data/editSolution", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi.patch(`incidents/${data?.id}/update-solution/`, { solution: data?.solution });
    return response.data;
  } catch (e) {
    return rejectWithValue(smthIsWrongErrorMessage);
  }
});

export const editSideAccident = createAsyncThunk("data/editSideAccident", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi.patch(`side_incident/update/${data?.id}/`, { side_accident: data?.side_accident });
    return response.data;
  } catch (e) {
    return rejectWithValue(smthIsWrongErrorMessage);
  }
});

export const editWorkStatus = createAsyncThunk("data/editWorkStatus", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi.patch(`incidents/${data?.id}/update-status/`, { work_status: data?.status });
    return response.data;
  } catch (e) {
    return rejectWithValue(smthIsWrongErrorMessage);
  }
});

export const editCause = createAsyncThunk("data/editCause", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi.patch(`incidents/${data?.id}/update_cause/`, { cause: data?.cause });
    return response.data;
  } catch (e) {
    return rejectWithValue(smthIsWrongErrorMessage);
  }
});

export const editComment = createAsyncThunk("data/editComment", async (data, {
  rejectWithValue
}) => {
  try {
    await axiosApi.post(`incident_list/`, data);
  } catch (e) {
    return rejectWithValue(smthIsWrongErrorMessage);
  }
});
