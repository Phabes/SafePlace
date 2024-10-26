import { useAppNavigation } from "../../../hooks";
import { useAppDispatch } from "../../../redux/hooks";
import { logout } from "../../../services";

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const logoutClick = async () => {
    await logout();
    dispatch({ type: "logout" });
    navigation.replace("SignIn");
  };

  return logoutClick;
};
