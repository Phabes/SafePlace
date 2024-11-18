import { ANIMAL_ENVIRONMENT } from "../constants/animalEnvironments";
import { ANIMAL_TYPES } from "../constants/animalTypes";

export type AnimalTypes = (typeof ANIMAL_TYPES)[number];
export type EnvironmentTypes = (typeof ANIMAL_ENVIRONMENT)[number];

export interface Animal {
  name: string;
  type: AnimalTypes;
  environment: EnvironmentTypes;
  friendly: boolean;
  age: number;
  details: string;
}

export interface AnimalDB extends Animal {
  id: string;
  shelterID: string;
}
