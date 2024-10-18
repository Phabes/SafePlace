import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";
import { ShelterSignInData } from "../../../../types";
import { FormLabel, Input } from "../../../../components";

type ShelterFormProps = {
  control: Control<ShelterSignInData>;
  errors: FieldErrors<ShelterSignInData>;
  clearErrors: UseFormClearErrors<ShelterSignInData>;
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
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            placeholder="Shelter Name"
            variant={errors.shelterName ? "error" : "default"}
            onChange={(e) => {
              clearErrors("shelterName");
              onChange(e);
            }}
          />
        )}
      />
    </>
  );
};
