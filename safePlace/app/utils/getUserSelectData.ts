import { HOUSING_AREA_TYPES, HOUSING_TYPES, USER_EXPIERIENCE_TYPES, USER_LIFESTYLE_TYPES } from "../constants/userProfilTypes";
import { SelectData } from "../types";

export const getUserExpirienceTypesToSelect = (): Array<SelectData> =>{
  return USER_EXPIERIENCE_TYPES.map((exp) => ({
    label: exp,
    value: exp,
  }))
}

export const getUserLifeestyleTypesToSelect = (): Array<SelectData> => {
  return USER_LIFESTYLE_TYPES.map((lifestyle) => ({
    label: lifestyle,
    value: lifestyle,
  }));
};

export const getHousingTypesToSelect = (): Array<SelectData> => {
  return HOUSING_TYPES.map((housing) => ({
    label: housing,
    value: housing,
  }));
};

export const getHousingAreaTypesToSelect = (): Array<SelectData> => {
  return HOUSING_AREA_TYPES.map((area) => ({
    label: area,
    value: area,
  }));
};