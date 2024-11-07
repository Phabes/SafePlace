import { useForm } from "react-hook-form";
import { Animal } from "../../../../types";

export const useAnimalData = (animal?: Animal) => {
  const { control: animalControl, handleSubmit: handleAnimalSubmit } =
    useForm<Animal>({
      defaultValues: {
        ...animal,
      },
    });

  return {
    animalControl,
    handleAnimalSubmit,
  };
};
