import {
  combineReducers,
  configureStore,
  UnknownAction,
} from "@reduxjs/toolkit";
import profileSlice from "./profileSlice";

const appReducer = combineReducers({
  profile: profileSlice,
});

const reducerProxy = (state: any, action: UnknownAction) => {
  if (action.type === "logout") {
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

export const store = configureStore({
  reducer: reducerProxy,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
