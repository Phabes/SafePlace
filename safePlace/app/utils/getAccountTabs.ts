import { SHELTER_TABS, USER_TABS } from "../constants/tabs";
import { AccountTypes } from "../types";

export const getAccountTabs = (type: AccountTypes) => {
  return type === "User" ? USER_TABS : SHELTER_TABS;
};
