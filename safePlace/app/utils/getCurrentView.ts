import { FC } from "react";
import { ViewList } from "../navigation";
import {
  Search,
  Favourite,
  UserProfile,
  Animals,
  Dashboard,
  ShelterProfile,
} from "../views";

const ViewComponents: Record<keyof ViewList, FC> = {
  Search: Search,
  Favourite: Favourite,
  UserProfile: UserProfile,
  Animals: Animals,
  Dashboard: Dashboard,
  ShelterProfile: ShelterProfile,
};

export const getCurrentView = (viewID: keyof ViewList) => {
  return ViewComponents[viewID];
};
