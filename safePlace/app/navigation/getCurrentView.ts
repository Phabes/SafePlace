import { FC } from "react";
import { ViewList } from ".";
import {
  Search,
  Petitions,
  UserProfile,
  Animals,
  Dashboard,
  ShelterProfile,
} from "../views";

const ViewComponents: Record<keyof ViewList, FC> = {
  Search: Search,
  Petitions: Petitions,
  UserProfile: UserProfile,
  Animals: Animals,
  Dashboard: Dashboard,
  ShelterProfile: ShelterProfile,
};

export const getCurrentView = (viewID: keyof ViewList) => {
  return ViewComponents[viewID];
};
