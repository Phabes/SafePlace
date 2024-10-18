import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { theme } from "../../constants/theme";
import { Button } from "../../components";
import { useState } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import { useSignUpData } from "./hooks";
import { UseFormHandleSubmit } from "react-hook-form";
import { CommonForm, ShelterForm, UserForm } from "./components";
import { FIREBASE_AUTH } from "../../../firebaseConfig/firebaseConfig";
import {
  CommonSignUpData,
  ShelterSignUpData,
  UserSignUpData,
} from "../../types";
import { createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { useAccountTypes } from "../../hooks";
import { useAuthNavigation } from "../../hooks/useAuthNavigation";

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
  } = useSignUpData();
  const radioButtons = useAccountTypes();

  const [selectedId, setSelectedId] = useState<string>("User");

  const executePipeline = async (
    handlers: UseFormHandleSubmit<
      CommonSignUpData | ShelterSignUpData | UserSignUpData,
      undefined
    >[]
  ): Promise<any> => {
    const results = { success: true };
    for (const handler of handlers) {
      const result = await new Promise((resolve, reject) => {
        handler(
          (data: object) => {
            resolve(data);
          },
          (error: unknown) => {
            resolve({ success: false });
          }
        )();
      });
      Object.assign(results, result);
    }

    return results;
  };

  const registerClick = async () => {
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
          console.log(error);
        }
      }
    } catch (error) {
      console.error("Registration error:", error);
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
            <View style={{ gap: theme.spacing(8) }}>
              <Button text="Sign Up" onPress={registerClick} />
              <Button
                text="Already have account?"
                variant="secondary"
                onPress={() => {
                  navigation.navigate("SignIn");
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
