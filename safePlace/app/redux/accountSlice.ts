import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AccountTypes } from "../types";

interface AccountState {
  userID: string | null;
  accountType: AccountTypes | "NoData";
}

const initialState: AccountState = {
  userID: null,
  accountType: "NoData",
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setUserID: (state, action: PayloadAction<AccountState["userID"]>) => {
      state.userID = action.payload;
    },
    setAccountType: (
      state,
      action: PayloadAction<AccountState["accountType"]>
    ) => {
      state.accountType = action.payload;
    },
    resetAccount: () => initialState,
  },
});

export const { setUserID, setAccountType, resetAccount } = accountSlice.actions;

export default accountSlice.reducer;
