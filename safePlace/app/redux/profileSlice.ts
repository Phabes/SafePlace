import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProfileState {
  userID: string | null;
}

const initialState: ProfileState = {
  userID: null,
};

export const profileSlice = createSlice({
  name: "profil",
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<string | null>) => {
      state.userID = action.payload;
    },
    resetProfil: () => initialState,
  },
});

export const { setUserID, resetProfil } = profileSlice.actions;

export default profileSlice.reducer;
