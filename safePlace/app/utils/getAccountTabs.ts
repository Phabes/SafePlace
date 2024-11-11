import { SHELTER_TABS, USER_TABS } from "../constants/tabs";
import { AccountType } from "../types";

export const getAccountTabs = (type: AccountType) => {
  return type === "User" ? USER_TABS.tabs : SHELTER_TABS.tabs;
};
