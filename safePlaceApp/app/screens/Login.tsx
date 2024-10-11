import { View } from "react-native";
import { theme } from "../constants/theme";
import { useInputValue } from "../components/Input/useInputValue";
import { Button, Input, Typography } from "../components";

export default function Login() {
  const loginClick = () => {};
  const [text, setText] = useInputValue();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View style={{ flexDirection: "row" }}>
        <View style={{ flex: 0.8, gap: theme.spacing(1) }}>
          <Typography variant={"header-large"} text={"Example"} />
          <Typography variant={"header-medium"} text={"Example"} />
          <Typography variant={"header-small"} text={"Example"} />
          <Typography variant={"body-large"} text={"Example"} />
          <Typography variant={"body-medium"} text={"Example"} />
          <Typography variant={"body-small"} text={"Example"} />
          <Input text={text} onChange={(e) => setText(e)} />
          <Input variant="error" text={text} onChange={(e) => setText(e)} />
          <Input disabled={true} text={text} onChange={(e) => setText(e)} />
          <Button text="Click" onPress={loginClick} />
        </View>
      </View>
    </View>
  );
}
