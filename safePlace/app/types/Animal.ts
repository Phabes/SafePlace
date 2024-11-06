import { ANIMAL_TYPES } from "../constants/animalTypes";

export type AnimalTypes = (typeof ANIMAL_TYPES)[number];

export type Animal = {
  name: string;
  type: AnimalTypes;
  environment: string;
  friendly: boolean;
  age: number;
  details: string;
};
