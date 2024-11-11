import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AppNavigationState {
  activeTab: number;
}

const initialState: AppNavigationState = {
  activeTab: 0,
};

const appNavigationSlice = createSlice({
  name: "appNavigation",
  initialState,
  reducers: {
    setActiveTab: (
      state,
      action: PayloadAction<AppNavigationState["activeTab"]>
    ) => {
      state.activeTab = action.payload;
    },
    resetAppNavigation: () => initialState,
  },
});

export const { setActiveTab, resetAppNavigation } = appNavigationSlice.actions;

export const selectActiveTab = (state: RootState) => {
  return state.appNavigation.activeTab;
};

export default appNavigationSlice.reducer;
