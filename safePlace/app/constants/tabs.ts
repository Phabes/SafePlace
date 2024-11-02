import { AccountTabs } from "../types";

export const USER_TABS: AccountTabs["User"] = {
  initialTab: 1,
  tabs: [
    { viewID: "Search", text: "Search" },
    { viewID: "Favourite", text: "Favourite" },
    { viewID: "UserProfile", text: "Profile" },
  ],
};

export const SHELTER_TABS: AccountTabs["Shelter"] = {
  initialTab: 1,
  tabs: [
    { viewID: "Animals", text: "Animals" },
    { viewID: "Dashboard", text: "Dashboard" },
    { viewID: "ShelterProfile", text: "Profile" },
  ],
};
