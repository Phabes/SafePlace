import { StackNavigationProp } from "@react-navigation/stack";

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
};

export type RootNavigationProps = StackNavigationProp<RootStackParamList>;
