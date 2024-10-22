import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackParamList = {
  Settings: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParamList>;
