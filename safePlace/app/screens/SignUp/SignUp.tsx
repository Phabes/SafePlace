import { Keyboard, StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import {
  Button,
  LayoutProvider,
  LoadingWrapper,
  Navbar,
  RadioBox,
} from "../../components";
import { useState } from "react";
import { useSignUpData } from "./hooks";
import { FieldError } from "react-hook-form";
import { CommonForm, ShelterForm, UserForm } from "./components";
import { useAppNavigation } from "../../hooks";
import { FirebaseError } from "firebase/app";
import { getFirebaseErrorMessage } from "../../utils";
import { executePipeline } from "./utils";
import { createAccount, saveShelter, saveUser } from "../../services";
import { RADIO_ACCOUNT_TYPES } from "../../constants/radioAccountTypes";

export const SignUp = () => {
  const navigation = useAppNavigation();

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

  const [signUpError, setSignUpError] = useState<FieldError | null>(null);
  const [accountType, setAccountType] = useState<string>("User");
  const [loading, setLoading] = useState(false);

  const registerClick = async () => {
    setLoading(true);
    Keyboard.dismiss();

    const handlers =
      accountType === "User"
        ? [handleCommonSubmit, handleUserSubmit]
        : [handleCommonSubmit, handleShelterSubmit];

    try {
      const signUpData = await executePipeline(handlers);
      if (signUpData.success) {
        try {
          const userCredential = await createAccount(
            signUpData.email,
            signUpData.password
          );

          const userID = userCredential.user.uid;

          if (accountType === "User") {
            await saveUser(signUpData, userID);
          } else {
            await saveShelter(signUpData, userID);
          }

          navigation.replace("Main");
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

  return (
    <LoadingWrapper isLoading={loading} text={"Signing Up..."}>
      <LayoutProvider navbar={<Navbar text="Sign Up" />}>
        <View style={styles.form}>
          <View>
            {RADIO_ACCOUNT_TYPES.map((radio) => {
              return (
                <RadioBox
                  key={`ACCOUNT_TYPE-${radio.id}`}
                  id={radio.id}
                  label={radio.label}
                  value={radio.value}
                  selected={radio.id === accountType}
                  onPress={setAccountType}
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
          {accountType === "User" ? (
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
                navigation.replace("SignIn");
              }}
            />
          </View>
        </View>
      </LayoutProvider>
    </LoadingWrapper>
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
