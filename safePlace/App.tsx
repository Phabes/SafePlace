import { NavigationContainer } from "@react-navigation/native";
import { useUserSession } from "./app/hooks";
import { AppStackScreen, AuthStackScreen } from "./app/navigation";

const App = () => {
  const { isAuthenticated, loading } = useUserSession();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default App;
