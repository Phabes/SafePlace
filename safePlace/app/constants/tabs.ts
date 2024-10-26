import { AccountTabs } from "../types";

export const USER_TABS: AccountTabs["User"] = {
  initialTab: 1,
  tabs: [{ text: "Search" }, { text: "Favourite" }, { text: "Profile" }],
};

export const SHELTER_TABS: AccountTabs["Shelter"] = {
  initialTab: 0,
  tabs: [{ text: "Animals" }, { text: "Dashboard" }, { text: "Profile" }],
};
