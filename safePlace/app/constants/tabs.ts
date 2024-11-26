import {
  faHeart,
  faListCheck,
  faMagnifyingGlass,
  faPaw,
  faPenFancy,
  faUser,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";
import { AccountTabs } from "../types";

export const USER_TABS: AccountTabs["User"] = {
  initialTab: 0,
  tabs: [
    { viewID: "Search", text: "Search", icon: faMagnifyingGlass },
    { viewID: "Petitions", text: "Petitions", icon: faPenFancy },
    { viewID: "UserProfile", text: "Profile", icon: faUser },
  ],
};

export const SHELTER_TABS: AccountTabs["Shelter"] = {
  initialTab: 0,
  tabs: [
    { viewID: "Animals", text: "Animals", icon: faPaw },
    { viewID: "Dashboard", text: "Dashboard", icon: faListCheck },
    { viewID: "ShelterProfile", text: "Profile", icon: faUserTie },
  ],
};
