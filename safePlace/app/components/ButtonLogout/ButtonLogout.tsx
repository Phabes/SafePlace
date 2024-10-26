import { FC } from "react";
import { Button, ButtonProps } from "../Button";
import { useLogout } from "./hooks/useLogout";

type ButtonLogoutProps = {
  size?: ButtonProps["size"];
};

export const ButtonLogout: FC<ButtonLogoutProps> = ({ size = "small" }) => {
  const logoutClick = useLogout();

  return <Button text="Logout" size={size} onPress={logoutClick} />;
};
