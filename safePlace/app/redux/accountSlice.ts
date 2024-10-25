import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

interface AccountState {
  userID: string | null;
}

const initialState: AccountState = {
  userID: null,
};

const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<AccountState["userID"]>) => {
      state.userID = action.payload;
    },
    resetAccount: () => initialState,
  },
});

export const { setUserID, resetAccount } = accountSlice.actions;

export const selectUserID = (state: RootState) => {
  return state.account.userID;
};

export default accountSlice.reducer;
