import {
  ButtonLogout,
  ErrorPage,
  LayoutProvider,
  LoadingWrapper,
  NavbarWithLogout,
} from "../../components";
import { useAccountType } from "../../hooks";
import { useAppSelector } from "../../redux/hooks";
import { selectActiveTab } from "../../redux/appNavigationSlice";
import { getCurrentView } from "../../navigation/getCurrentView";
import { getAccountTabProps } from "../../utils";

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

  const { viewID, viewName } = getAccountTabProps(type, activeTab);

  const CurrentViewComponent = getCurrentView(viewID);

  return (
    <LoadingWrapper isLoading={loading} text="Loading Account Data...">
      <LayoutProvider
        navbar={<NavbarWithLogout text={viewName} />}
        userType={type}
      >
        <CurrentViewComponent />
      </LayoutProvider>
    </LoadingWrapper>
  );
};
