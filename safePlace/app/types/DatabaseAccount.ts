import { HousingAreaTypes, HousingTypes, UserExpierienceTypes, UserLifestyleTypes } from "./User";

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

export type AdditionalUserData = {
  age: number;
  experience: UserExpierienceTypes;
  housing: HousingTypes;
  area: HousingAreaTypes;
  lifestyle: UserLifestyleTypes;
  profilePhoto: string;
  backgroundPhoto: string;
};
