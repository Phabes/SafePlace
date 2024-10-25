import { View } from "react-native";
import {
  LayoutProvider,
  LoadingWrapper,
  NavbarWithLogout,
  Typography,
} from "../../components";
import { useAccountType } from "../../hooks";
import { useAppSelector } from "../../redux/hooks";
import { selectActiveTab } from "../../redux/appNavigationSlice";
import { getCurrentScreen } from "../../utils";

export const Main = () => {
  const { type, loading, error } = useAccountType();
  const activeTab = useAppSelector(selectActiveTab);

  if (error) {
    // TO DO - CREATE SPECIFIC VIEW FOR IT
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography text={"NO DATA. PLEASE RELOGIN."} />
      </View>
    );
  }

  const screen = getCurrentScreen(type, activeTab);

  return (
    <LoadingWrapper isLoading={loading} text="Loading Account Data...">
      <LayoutProvider
        navbar={<NavbarWithLogout text="Settings" />}
        userType={type}
      >
        {/* TO DO - LOAD DIFFERENT VIEWS */}
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography text={"LOGGED IN"} />
          <Typography text={screen} />
        </View>
      </LayoutProvider>
    </LoadingWrapper>
  );
};
