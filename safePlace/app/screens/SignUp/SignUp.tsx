import {
  Keyboard,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { theme } from "../../constants/theme";
import { Button, LayoutProvider, Loading, Navbar } from "../../components";
import { useState } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import { useSignUpData } from "./hooks";
import { FieldError } from "react-hook-form";
import { CommonForm, ShelterForm, UserForm } from "./components";
import { FIREBASE_AUTH } from "../../../firebaseConfig/firebaseConfig";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useAccountTypes } from "../../hooks";
import { useAuthNavigation } from "../../hooks/useAuthNavigation";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "../../utils";
import { executePipeline } from "./utils";

export const SignUp = () => {
  const navigation = useAuthNavigation();

  const {
    commonControl,
    handleCommonSubmit,
    commonErrors,
    clearCommonErrors,
    shelterControl,
    handleShelterSubmit,
    shelterErrors,
    clearShelterErrors,
    userControl,
    handleUserSubmit,
    userErrors,
    clearUserErrors,
    resetSignUp,
  } = useSignUpData();
  const radioButtons = useAccountTypes();

  const [signUpError, setSignUpError] = useState<FieldError | null>(null);
  const [selectedId, setSelectedId] = useState<string>("User");
  const [loading, setLoading] = useState(false);

  const registerClick = async () => {
    setLoading(true);
    Keyboard.dismiss();

    const handlers =
      selectedId === "User"
        ? [handleCommonSubmit, handleUserSubmit]
        : [handleCommonSubmit, handleShelterSubmit];

    try {
      const signUpData = await executePipeline(handlers);
      if (signUpData.success) {
        try {
          await createUserWithEmailAndPassword(
            FIREBASE_AUTH,
            signUpData.email,
            signUpData.password
          );
        } catch (error) {
          if (error instanceof FirebaseError) {
            setSignUpError(getFirebaseErrorMessage(error.code));
          } else {
            setSignUpError(getFirebaseErrorMessage("Error during sign up"));
          }
        }
      }
    } catch (error) {
      setSignUpError(getFirebaseErrorMessage("Error during sign up"));
    } finally {
      setLoading(false);
    }
  };

  const signUpEmailInputChange = () => {
    setSignUpError(null);
  };

  if (loading) {
    return <Loading text="Signing Up..." />;
  }

  return (
    <LayoutProvider navbar={<Navbar text="Sign Up" />}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.form}>
          <View>
            {radioButtons.map((radio) => {
              return (
                <RadioButton
                  key={radio.id}
                  id={radio.id}
                  containerStyle={{ marginHorizontal: 0 }}
                  borderColor={theme.colors["text-success"]}
                  color={theme.colors["text-success"]}
                  label={radio.label}
                  value={radio.value}
                  selected={radio.id === selectedId}
                  onPress={setSelectedId}
                />
              );
            })}
          </View>
          <CommonForm
            control={commonControl}
            errors={commonErrors}
            clearErrors={clearCommonErrors}
            signUpError={signUpError}
            signUpEmailInputChange={signUpEmailInputChange}
          />
          {selectedId === "User" ? (
            <UserForm
              control={userControl}
              errors={userErrors}
              clearErrors={clearUserErrors}
            />
          ) : (
            <ShelterForm
              control={shelterControl}
              errors={shelterErrors}
              clearErrors={clearShelterErrors}
            />
          )}
          <View style={styles.buttons}>
            <Button text="Sign Up" onPress={registerClick} />
            <Button
              text="Already have account?"
              variant="secondary"
              onPress={() => {
                setSignUpError(null);
                resetSignUp();
                navigation.navigate("SignIn");
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