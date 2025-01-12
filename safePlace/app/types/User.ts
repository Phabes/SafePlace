import { HOUSING_AREA_TYPES, HOUSING_TYPES, USER_EXPIERIENCE_TYPES, USER_LIFESTYLE_TYPES } from "../constants/userProfilTypes";

export type UserExpierienceTypes = (typeof USER_EXPIERIENCE_TYPES)[number];
export type UserLifestyleTypes = (typeof USER_LIFESTYLE_TYPES)[number];
export type HousingTypes = (typeof HOUSING_TYPES)[number];
export type HousingAreaTypes = (typeof HOUSING_AREA_TYPES)[number];