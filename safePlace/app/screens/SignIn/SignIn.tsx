import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { theme } from "../../constants/theme";
import {
  Button,
  FormLabel,
  Input,
  LayoutProvider,
  Loading,
  Navbar,
} from "../../components";
import { signInWithEmailAndPassword } from "firebase/auth";
import { FIREBASE_AUTH } from "../../../firebaseConfig/firebaseConfig";
import { Controller, FieldError } from "react-hook-form";
import { SignInData } from "../../types";
import { useSignInData } from "./hooks";
import { useAppNavigation } from "../../hooks";
import { FirebaseError } from "firebase/app";
import { useState } from "react";
import { getFirebaseErrorMessage } from "../../utils";

export const SignIn = () => {
  const navigation = useAppNavigation();

  const {
    loginControl,
    handleLoginSubmit,
    loginErrors,
    clearLoginErrors,
    loginReset,
  } = useSignInData();

  const [signInError, setSignInError] = useState<FieldError | null>(null);
  const [loading, setLoading] = useState(false);

  const loginClick = async (data: SignInData) => {
    setLoading(true);
    Keyboard.dismiss();
    setSignInError(null);

    try {
      await signInWithEmailAndPassword(
        FIREBASE_AUTH,
        data.email,
        data.password
      );

      navigation.replace("Settings");
    } catch (error) {
      if (error instanceof FirebaseError) {
        setSignInError(getFirebaseErrorMessage(error.code));
      } else {
        setSignInError(getFirebaseErrorMessage("Error during sign in"));
      }
    } finally {
      setLoading(false);
    }
  };

  const signInInputChange = (
    value: string,
    onChange: (...event: any[]) => void,
    toClear: keyof SignInData
  ) => {
    setSignInError(null);
    clearLoginErrors(toClear);
    onChange(value);
  };

  if (loading) {
    return <Loading text="Signing In..." />;
  }

  return (
    <LayoutProvider navbar={<Navbar text="Sign In" />}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.form}>
          <FormLabel
            text={"Email"}
            errors={signInError ? signInError : loginErrors.email}
          />
          <Controller
            control={loginControl}
            name="email"
            render={({ field: { onChange, value, name } }) => (
              <Input
                text={value}
                keyboardType="email-address"
                placeholder="Email"
                autoCapitalize="none"
                variant={
                  signInError
                    ? "error"
                    : loginErrors.email
                    ? "error"
                    : "default"
                }
                onChange={(e) => signInInputChange(e, onChange, name)}
              />
            )}
          />
          <FormLabel text={"Password"} errors={loginErrors.password} />
          <Controller
            control={loginControl}
            name="password"
            render={({ field: { onChange, value, name } }) => (
              <Input
                text={value}
                placeholder="Password"
                autoCapitalize="none"
                variant={
                  signInError
                    ? "error"
                    : loginErrors.password
                    ? "error"
                    : "default"
                }
                password={true}
                onChange={(e) => signInInputChange(e, onChange, name)}
              />
            )}
          />
          <View style={styles.buttons}>
            <Button text="Login" onPress={handleLoginSubmit(loginClick)} />
            <Button
              text="Create new account"
              variant="secondary"
              onPress={() => {
                setSignInError(null);
                loginReset();
                navigation.replace("SignUp");
              }}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </LayoutProvider>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    justifyContent: "center",
    gap: theme.spacing(1),
  },
  buttons: { gap: theme.spacing(8) },
});
