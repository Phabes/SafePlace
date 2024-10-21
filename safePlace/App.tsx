import { NavigationContainer } from "@react-navigation/native";
import { useUserSession } from "./app/hooks";
import { AppStackScreen, AuthStackScreen } from "./app/navigation";
import { Loading } from "./app/components";
import { Iconoir } from "iconoir-react-native";
import { View } from "react-native";

const App = () => {
  const { isAuthenticated, loading } = useUserSession();

  if (loading) {
    return <Loading text="Checking..." />;
  }

  return (
    <View style={{ flex: 1 }}>
      <Iconoir />
      <NavigationContainer>
        {true ? <AppStackScreen /> : <AuthStackScreen />}
      </NavigationContainer>
    </View>
  );
};

export default App;
