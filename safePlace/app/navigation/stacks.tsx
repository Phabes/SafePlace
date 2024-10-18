import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList, AuthStackParamList } from "./navigation";
import { Settings, SignIn, SignUp } from "../screens";

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AppStackScreen = () => (
  <AppStack.Navigator>
    <AppStack.Screen name="Settings" component={Settings} />
  </AppStack.Navigator>
);

export const AuthStackScreen = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);
