import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosApi from "../axiosApi";
import { isAxiosError } from "axios";
import { smthIsWrongErrorMessage } from "../constants";

export const getTroubles = createAsyncThunk("data/getTroubles", async (data, {
  rejectWithValue
}) => {
  try {
    const response = await axiosApi(`incident_list/`);
    return response.data?.results || [];
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 400) {
      return rejectWithValue(smthIsWrongErrorMessage);
    }
    throw e;
  }
});
