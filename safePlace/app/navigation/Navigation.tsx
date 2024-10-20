import { NavigationContainer } from "@react-navigation/native";
import { useUserSession } from "../hooks";
import { Loading } from "../components";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackParamList } from "./navigationParams";
import { Settings, SignIn, SignUp } from "../screens";

const Stack = createNativeStackNavigator<StackParamList>();

export const Navigation = () => {
  const { isAuthenticated, loading } = useUserSession();

  const startingScreen = isAuthenticated ? "Settings" : "SignIn";

  if (loading) {
    return <Loading text="Checking..." />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={startingScreen}
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
