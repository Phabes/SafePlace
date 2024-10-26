import { SHELTER_TABS, USER_TABS } from "../constants/tabs";
import { AccountTypes } from "../types";

export const getInitialTab = (type: AccountTypes) => {
  return type === "User" ? USER_TABS.initialTab : SHELTER_TABS.initialTab;
};
