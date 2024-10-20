import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface ProfileState {
  userID: string;
}

const initialState: ProfileState = {
  userID: "",
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    resetProfile: () => initialState,
    setUserID: (state, action: PayloadAction<string>) => {
      state.userID = action.payload;
    },
  },
});

export const { resetProfile, setUserID } = profileSlice.actions;

export const selectUserID = (state: RootState) => state.profile.userID;

export default profileSlice.reducer;
