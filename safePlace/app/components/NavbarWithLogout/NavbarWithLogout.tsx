import { FC } from "react";
import { Navbar } from "../Navbar";
import { ButtonProps } from "../Button";
import { FIREBASE_AUTH } from "../../../firebaseConfig/firebaseConfig";
import { useAppNavigation } from "../../hooks";

type NavbarWithLogoutProps = {
  text: string;
  backButton?: boolean;
};

export const NavbarWithLogout: FC<NavbarWithLogoutProps> = ({
  text,
  backButton = true,
}) => {
  const navigation = useAppNavigation();

  const logoutClick = async () => {
    await FIREBASE_AUTH.signOut();
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
