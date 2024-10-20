import { View } from "react-native";
import { LayoutProvider, Typography } from "../../components";
import { NavbarWithLogout } from "../../components/NavbarWithLogout";
import { useAppSelector } from "../../redux/hooks";
import { selectUserID } from "../../redux/profileSlice";

export const Settings = () => {
  const user = useAppSelector((state) => selectUserID(state));
  console.log(user);

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
