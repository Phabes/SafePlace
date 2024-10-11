import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { theme } from "../constants/theme";
import { useInputValue } from "../components/Input/useInputValue";
import { Button, Input, Typography } from "../components";
import { useAppNavigation } from "../hooks/useAppNavigation";

export const Register = () => {
  const registerClick = () => {};
  const [mail, setMail] = useInputValue();
  const [password, setPassword] = useInputValue();

  const navigation = useAppNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <View style={{ flex: 0.8, gap: theme.spacing(1) }}>
            <Typography text={"Email:"} />
            <Input
              text={mail}
              keyboardType="email-address"
              placeholder="Email"
              autoCapitalize="none"
              onChange={setMail}
            />
            <Typography text={"Password:"} />
            <Input
              text={password}
              placeholder="Password"
              autoCapitalize="none"
              password={true}
              onChange={setPassword}
            />
            <View style={{ gap: theme.spacing(8) }}>
              <Button text="Sign Up" onPress={registerClick} />
              <Button
                text="Already have account?"
                variant="secondary"
                onPress={() => {
                  navigation.navigate("Login");
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
