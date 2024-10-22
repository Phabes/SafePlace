import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackParamList = {
  UserProfileForm: undefined;
  Settings: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParamList>;
