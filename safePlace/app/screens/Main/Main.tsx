import { View } from "react-native";
import {
  ButtonLogout,
  ErrorPage,
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
    return (
      <ErrorPage
        text="No data was found associated with this account."
        action="Please login again."
        button={<ButtonLogout size="medium" />}
      />
    );
  }

  const screen = getCurrentScreen(type, activeTab);

  return (
    <LoadingWrapper isLoading={loading} text="Loading Account Data...">
      <LayoutProvider
        navbar={<NavbarWithLogout text={screen} />}
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
