import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";
import { FormLabel, Input } from "../../../../components";
import { UserSignUpData } from "../../../../types";

type UserFormProps = {
  control: Control<UserSignUpData>;
  errors: FieldErrors<UserSignUpData>;
  clearErrors: UseFormClearErrors<UserSignUpData>;
};

export const UserForm = ({ control, errors, clearErrors }: UserFormProps) => {
  return (
    <>
      <FormLabel text={"Name"} errors={errors.name} />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value, name } }) => (
          <Input
            text={value}
            placeholder="Name"
            variant={errors.name ? "error" : "default"}
            onChange={(e) => {
              clearErrors(name);
              onChange(e);
            }}
          />
        )}
      />
      <FormLabel text={"Surname"} errors={errors.surname} />
      <Controller
        control={control}
        name="surname"
        render={({ field: { onChange, value, name } }) => (
          <Input
            text={value}
            placeholder="Surname"
            variant={errors.surname ? "error" : "default"}
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
