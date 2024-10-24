import { FC } from "react";
import { AccountTypes } from "../../types";
import { UserNavigation } from "./UserNavigation";
import { ShelterNavigation } from "./ShelterNavigation";

type BottomNavigationProps = {
  type: AccountTypes | undefined;
};

export const BottomNavigation: FC<BottomNavigationProps> = ({ type }) => {
  return type === "User" ? <UserNavigation /> : <ShelterNavigation />;
};
