import {
  combineReducers,
  configureStore,
  UnknownAction,
} from "@reduxjs/toolkit";
import accountSlice from "./accountSlice";

const appReducer = combineReducers({
  account: accountSlice,
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
