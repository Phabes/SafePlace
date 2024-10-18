import { StackNavigationProp } from "@react-navigation/stack";

export type AppStackParamList = {
  Settings: undefined;
};

export type AuthStackParamList = {
  SignUp: undefined;
  SignIn: undefined;
};

export type AppNavigationProps = StackNavigationProp<AppStackParamList>;

export type AuthNavigationProps = StackNavigationProp<AuthStackParamList>;
