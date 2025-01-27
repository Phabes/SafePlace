import { AnimalTypes, EnvironmentTypes } from "../types";

export interface Filter {
  type: AnimalTypes | "";
  environment: EnvironmentTypes | "";
  friendly: boolean;
  age: number;
  useUserDetails: boolean;
}