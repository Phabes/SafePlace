import { Keyboard, TouchableWithoutFeedback, View } from "react-native";
import { Button, Typography } from "../../components";
import { FIREBASE_AUTH } from "../../../firebaseConfig/firebaseConfig";

export const Settings = () => {
  const logoutClick = async () => {
    FIREBASE_AUTH.signOut();
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
          <Typography text={"LOGGED IN:"} />
          <Button text="Logout" onPress={logoutClick} />
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};
