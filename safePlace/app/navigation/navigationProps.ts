import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
  Main: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParamList>;
