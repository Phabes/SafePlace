import { ANIMAL_TYPES } from "../constants/animalTypes";
import { SelectData } from "../types";

export const getAnimalsTypesToSelect = (): Array<SelectData> => {
  return ANIMAL_TYPES.map((animal) => ({
    label: animal,
    value: animal,
  }));
};
