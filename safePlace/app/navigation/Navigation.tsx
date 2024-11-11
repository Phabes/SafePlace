import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppStackParamList } from "./navigationProps";
import { Main, SignIn, SignUp, UserProfileForm } from "../screens";
import { useUserSession } from "../hooks";
import { Loading } from "../components";

const AppStack = createNativeStackNavigator<AppStackParamList>();

export const Navigation = () => {
  const { isAuthenticated, loading } = useUserSession();

  if (loading) {
    return <Loading text="Checking..." />;
  }

  const initialRouteName = "UserProfileForm"  //! isAuthenticated ? "Main" : "SignIn"; 

  return (
    <NavigationContainer>
      <AppStack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={initialRouteName}
      >
        <AppStack.Screen name="UserProfileForm" component={UserProfileForm} />
        <AppStack.Screen name="Main" component={Main} />
        <AppStack.Screen name="SignIn" component={SignIn} />
        <AppStack.Screen name="SignUp" component={SignUp} />
      </AppStack.Navigator>
    </NavigationContainer>
  );
};
