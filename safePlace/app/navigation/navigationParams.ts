import { StackNavigationProp } from "@react-navigation/stack";

export type StackParamList = {
  Settings: undefined;
  SignUp: undefined;
  SignIn: undefined;
};

export type NavigationProps = StackNavigationProp<StackParamList>;
