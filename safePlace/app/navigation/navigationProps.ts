import { FC } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  Animals,
  Dashboard,
  Favourite,
  Search,
  ShelterProfile,
  UserProfile,
} from "../views";

export type AppStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Main: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParamList>;

export type ViewList = {
  Search: undefined;
  Favourite: undefined;
  UserProfile: undefined;
  Animals: undefined;
  Dashboard: undefined;
  ShelterProfile: undefined;
};

export const ViewComponents: Record<keyof ViewList, FC> = {
  Search: Search,
  Favourite: Favourite,
  UserProfile: UserProfile,
  Animals: Animals,
  Dashboard: Dashboard,
  ShelterProfile: ShelterProfile,
};
