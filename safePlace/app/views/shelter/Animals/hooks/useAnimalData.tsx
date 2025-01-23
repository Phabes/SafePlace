import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Animal,
  AnimalDB,
  AnimalTypes,
  EnvironmentTypes,
} from "../../../../types";
import { ANIMAL_TYPES } from "../../../../constants/animalTypes";
import { ANIMAL_ENVIRONMENT } from "../../../../constants/animalEnvironments";

const animalSchema = Yup.object().shape({
  photo: Yup.string().default(""),
  name: Yup.string().required("Name is required"),
  type: Yup.mixed<AnimalTypes>()
    .oneOf(ANIMAL_TYPES)
    .required("Animal type is required"),
  environment: Yup.mixed<EnvironmentTypes>()
    .oneOf(ANIMAL_ENVIRONMENT)
    .required("Environment is required"),
  friendly: Yup.boolean().oneOf([true, false]).default(true),
  age: Yup.number()
    .min(0, "Age must be a positive number")
    .required("Age is required"),
  details: Yup.string().default(""),
});

export const useAnimalData = (animalDB?: AnimalDB) => {
  const animal: Animal | undefined = animalDB
    ? {
        photo: animalDB.photo,
        name: animalDB.name,
        type: animalDB.type,
        environment: animalDB.environment,
        friendly: animalDB.friendly,
        age: animalDB.age,
        details: animalDB.details,
      }
    : undefined;

  const {
    control: animalControl,
    handleSubmit: handleAnimalSubmit,
    formState: { errors: animalErrors },
  } = useForm<Animal>({
    defaultValues: {
      friendly: true,
      ...animal,
    },
    resolver: yupResolver(animalSchema),
  });

  return {
    animalControl,
    handleAnimalSubmit,
    animalErrors,
  };
};
