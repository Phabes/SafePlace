import { FC } from "react";
import { Navbar } from "../Navbar";
import { ButtonProps } from "../Button";
import { useAppNavigation } from "../../hooks";
import { logout } from "../../services";
import { useAppDispatch } from "../../redux/hooks";

type NavbarWithLogoutProps = {
  text: string;
  backButton?: boolean;
};

export const NavbarWithLogout: FC<NavbarWithLogoutProps> = ({
  text,
  backButton = true,
}) => {
  const dispatch = useAppDispatch();
  const navigation = useAppNavigation();

  const logoutClick = async () => {
    await logout();
    dispatch({ type: "logout" });
    navigation.replace("SignIn");
  };

  const logoutButtonProps: ButtonProps = {
    text: "Logout",
    size: "small",
    onPress: logoutClick,
  };

  return (
    <Navbar text={text} button={logoutButtonProps} backButton={backButton} />
  );
};
