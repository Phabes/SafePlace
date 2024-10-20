import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";
import { ShelterSignUpData } from "../../../../types";
import { FormLabel, Input } from "../../../../components";

type ShelterFormProps = {
  control: Control<ShelterSignUpData>;
  errors: FieldErrors<ShelterSignUpData>;
  clearErrors: UseFormClearErrors<ShelterSignUpData>;
};

export const ShelterForm = ({
  control,
  errors,
  clearErrors,
}: ShelterFormProps) => {
  return (
    <>
      <FormLabel text={"Shelter Name"} errors={errors.shelterName} />
      <Controller
        control={control}
        name="shelterName"
        render={({ field: { onChange, value, name } }) => (
          <Input
            text={value}
            placeholder="Shelter Name"
            variant={errors.shelterName ? "error" : "default"}
            onChange={(e) => {
              clearErrors(name);
              onChange(e);
            }}
          />
        )}
      />
    </>
  );
};
