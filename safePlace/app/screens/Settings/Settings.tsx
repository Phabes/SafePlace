import { View } from "react-native";
import {
  LayoutProvider,
  LoadingWrapper,
  NavbarWithLogout,
  Typography,
} from "../../components";
import { useAccountType } from "../../hooks";

export const Settings = () => {
  const type = useAccountType();

  if (type === "NoData") {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography text={"NO DATA. PLEASE RELOGIN"} />
      </View>
    );
  }

  return (
    <LoadingWrapper isLoading={!type} text="Loading Account Data...">
      <LayoutProvider
        navbar={<NavbarWithLogout text="Settings" />}
        userType={type}
      >
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
    </LoadingWrapper>
  );
};
