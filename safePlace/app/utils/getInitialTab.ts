import { SHELTER_TABS, USER_TABS } from "../constants/tabs";
import { AccountType } from "../types";

export const getInitialTab = (type: AccountType) => {
  return type === "User" ? USER_TABS.initialTab : SHELTER_TABS.initialTab;
};
