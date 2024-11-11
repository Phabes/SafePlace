import { SHELTER_TABS, USER_TABS } from "../constants/tabs";
import { AccountType } from "../types";

export const getAccountTabProps = (type: AccountType, activeTab: number) => {
  const currentTabs = type === "User" ? USER_TABS : SHELTER_TABS;
  const currentTab = currentTabs.tabs[activeTab];

  const viewID = currentTab.viewID;
  const viewName = currentTab.text;

  return { viewID, viewName };
};
