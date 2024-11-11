import { FC } from "react";
import { Navbar } from "../Navbar";
import { ButtonLogout } from "../ButtonLogout";

type NavbarWithLogoutProps = {
  text: string;
};

export const NavbarWithLogout: FC<NavbarWithLogoutProps> = ({ text }) => {
  return <Navbar text={text} button={<ButtonLogout />} />;
};
