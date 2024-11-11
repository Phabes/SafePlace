import { AdditionalUserData } from "./userAccount";

export type DatabaseUser = {
  email: string;
  name: string;
  surname: string;
  details: AdditionalUserData;
};

export type DatabaseShelter = {
  email: string;
  shelterName: string;
};
