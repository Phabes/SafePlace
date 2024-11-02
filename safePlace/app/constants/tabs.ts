import {
  faHeart,
  faListCheck,
  faMagnifyingGlass,
  faPaw,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { AccountTabs } from "../types";

export const USER_TABS: AccountTabs["User"] = {
  initialTab: 1,
  tabs: [
    { viewID: "Search", text: "Search", icon: faMagnifyingGlass },
    { viewID: "Favourite", text: "Favourite", icon: faHeart },
    { viewID: "UserProfile", text: "Profile", icon: faUser },
  ],
};

export const SHELTER_TABS: AccountTabs["Shelter"] = {
  initialTab: 1,
  tabs: [
    { viewID: "Animals", text: "Animals", icon: faPaw },
    { viewID: "Dashboard", text: "Dashboard", icon: faListCheck },
    { viewID: "ShelterProfile", text: "Profile", icon: faUserTie },
  ],
};
