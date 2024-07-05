import { combineReducers, configureStore } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  //dataState: persistReducer(usersPersistConfig, dataReducer),
});

export const store = configureStore({
  reducer: rootReducer,
});
