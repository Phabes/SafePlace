import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Main: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParamList>;

export type ViewList = {
  Search: undefined;
  Petitions: undefined;
  UserProfile: undefined;
  Animals: undefined;
  Dashboard: undefined;
  ShelterProfile: undefined;
};
