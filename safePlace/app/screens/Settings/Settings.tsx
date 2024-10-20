import { View } from "react-native";
import { LayoutProvider, Typography } from "../../components";
import { NavbarWithLogout } from "../../components/NavbarWithLogout";

export const Settings = () => {
  return (
    <LayoutProvider navbar={<NavbarWithLogout text="Settings" />}>
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography text={"LOGGED IN"} />
      </View>
    </LayoutProvider>
  );
};
