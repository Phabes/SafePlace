import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { theme } from "../../constants/theme";
import { Button, FormLabel, Input } from "../../components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebaseConfig/firebaseConfig";
import { Controller } from "react-hook-form";
import { SignInData } from "../../types";
import { useAuthNavigation } from "../../hooks/useAuthNavigation";
import { useSignInData } from "./hooks";

export const SignIn = () => {
  const navigation = useAuthNavigation();

  const { loginControl, handleLoginSubmit, loginErrors, clearLoginErrors } =
    useSignInData();

  const loginClick = async (data: SignInData) => {
    Keyboard.dismiss();

    try {
      await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        data.email,
        data.password
      );
    } catch (error) {
      console.log(error);
    }
  };

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
          <View style={{ flex: 0.9, gap: theme.spacing(1) }}>
            <FormLabel text={"Email"} errors={loginErrors.email} />
            <Controller
              control={loginControl}
              name="email"
              render={({ field: { onChange, value } }) => (
                <Input
                  text={value}
                  keyboardType="email-address"
                  placeholder="Email"
                  autoCapitalize="none"
                  variant={loginErrors.email ? "error" : "default"}
                  onChange={(e) => {
                    clearLoginErrors("email");
                    onChange(e);
                  }}
                />
              )}
            />
            <FormLabel text={"Password"} errors={loginErrors.password} />
            <Controller
              control={loginControl}
              name="password"
              render={({ field: { onChange, value } }) => (
                <Input
                  text={value}
                  placeholder="Password"
                  autoCapitalize="none"
                  variant={loginErrors.password ? "error" : "default"}
                  password={true}
                  onChange={(e) => {
                    clearLoginErrors("password");
                    onChange(e);
                  }}
                />
              )}
            />
            <View style={{ gap: theme.spacing(8) }}>
              <Button text="Login" onPress={handleLoginSubmit(loginClick)} />
              <Button
                text="Create new account"
                variant="secondary"
                onPress={() => {
                  navigation.navigate("SignUp");
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
