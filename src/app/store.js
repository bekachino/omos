import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { dataReducer } from "../features/dataSlice";

const rootReducer = combineReducers({
  dataState: dataReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});
