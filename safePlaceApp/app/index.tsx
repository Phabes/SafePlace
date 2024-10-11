import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation";
import { Login, Register } from "./screens";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Index() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
}
