import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  AnimalTypes,
  EnvironmentTypes,
} from "../../../types";
import { ANIMAL_TYPES } from "../../../constants/animalTypes";
import { ANIMAL_ENVIRONMENT } from "../../../constants/animalEnvironments";
import { Filter } from "../../../constants/filterType";

const filterSchema = Yup.object().shape({

  type: Yup.mixed<AnimalTypes | "">()
    .oneOf(ANIMAL_TYPES).default(""),
  environment: Yup.mixed<EnvironmentTypes | "">()
    .oneOf(ANIMAL_ENVIRONMENT).default(""),
  friendly: Yup.boolean().oneOf([true, false]).default(true),
  age: Yup.number()
    .min(0, "Age must be a positive number")
    .default(0),
  useUserDetails: Yup.boolean().oneOf([true, false]).default(false),
});

export const useFilteringData = (filterData?: Filter) => {
  const filter: Filter | undefined = filterData
    ? {
      type: filterData.type,
      environment: filterData.environment,
      friendly: filterData.friendly,
      age: filterData.age,
      useUserDetails: filterData.useUserDetails
      }
    : undefined;

  const {
    control: filterControl,
    handleSubmit: handleFilterSubmit,
    formState: { errors: filterErrors },
  } = useForm<Filter>({
    defaultValues: {
      ...filter,
    },
    resolver: yupResolver(filterSchema),
  });

  return {
    filterControl,
    handleFilterSubmit,
    filterErrors,
  };
};
