import { ANIMAL_ENVIRONMENT } from "../constants/animalEnvironments";
import { ANIMAL_TYPES } from "../constants/animalTypes";
import { SelectData } from "../types";

export const getAnimalTypesToSelect = (): Array<SelectData> => {
  return ANIMAL_TYPES.map((animal) => ({
    label: animal,
    value: animal,
  }));
};

export const getAnimalEnvironmentsToSelect = (): Array<SelectData> => {
  return ANIMAL_ENVIRONMENT.map((environment) => ({
    label: environment,
    value: environment,
  }));
};
