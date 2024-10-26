import { SHELTER_TABS, USER_TABS } from "../constants/tabs";
import { AccountTypes } from "../types";

export const getCurrentScreen = (type: AccountTypes, activeTab: number) => {
  const currentTabs = type === "User" ? USER_TABS : SHELTER_TABS;
  return currentTabs.tabs[activeTab].text;
};
