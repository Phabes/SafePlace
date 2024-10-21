import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList, AuthStackParamList } from "./navigation";
import { Settings, SignIn, SignUp, UserProfileForm } from "../screens";

const AppStack = createNativeStackNavigator<AppStackParamList>();

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

export const AppStackScreen = () => (
  <AppStack.Navigator screenOptions={{ headerShown: false }}>
    <AppStack.Screen name="UserProfileForm" component={UserProfileForm} />
    <AppStack.Screen name="Settings" component={Settings} />
  </AppStack.Navigator>
);

export const AuthStackScreen = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="SignIn" component={SignIn} />
    <AuthStack.Screen name="SignUp" component={SignUp} />
  </AuthStack.Navigator>
);
