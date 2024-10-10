import { Text, View } from "react-native";
import Button from "../components/Button/Button";

export default function Login() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <Button text="Click" />
      </View>
      <Text>Login Page</Text>
    </View>
  );
}
