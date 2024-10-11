import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { theme } from "../../constants/theme";
import { Button } from "../../components";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useMemo, useState } from "react";
import { RadioButton } from "react-native-radio-buttons-group";
import { UserForm } from "./components/UserForm";
import { ShelterForm } from "./components/ShelterForm";
import { CommonForm } from "./components/CommonForm";
import { useAccountTypes, useSignUpData } from "./hooks";

export const Register = () => {
  const navigation = useAppNavigation();

  const [repeatPasswordError, setRepeatPasswordError] =
    useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("User");
  const {
    commonControl,
    getCommonValues,
    shelterControl,
    getShelterValues,
    userControl,
    getUserValues,
  } = useSignUpData();
  const radioButtons = useAccountTypes();

  const registerClick = () => {
    Keyboard.dismiss();
    const commonValues = getCommonValues();
    if (commonValues.password !== commonValues.repeatPassword) {
      setRepeatPasswordError(true);
    }
    const signUpData =
      selectedId === "User"
        ? { ...commonValues, ...getUserValues() }
        : { ...commonValues, ...getShelterValues() };
    console.log(signUpData);
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
          <View style={{ flex: 0.8, gap: theme.spacing(1) }}>
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
              repeatPasswordError={repeatPasswordError}
              setRepeatPasswordError={setRepeatPasswordError}
            />
            {selectedId === "User" ? (
              <UserForm control={userControl} />
            ) : (
              <ShelterForm control={shelterControl} />
            )}
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
