import { NavigationContainer } from "@react-navigation/native";
import { useUserSession } from "./app/hooks";
import { AppStackScreen, AuthStackScreen } from "./app/navigation";
import { Loading } from "./app/components";

const App = () => {
  const { isAuthenticated, loading } = useUserSession();

  if (loading) {
    return <Loading text="Checking..." />;
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppStackScreen /> : <AuthStackScreen />}
    </NavigationContainer>
  );
};

export default App;
