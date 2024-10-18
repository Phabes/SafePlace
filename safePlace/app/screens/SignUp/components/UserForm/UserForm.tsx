import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";
import { UserSignInData } from "../../../../types";
import { FormLabel, Input } from "../../../../components";

type UserFormProps = {
  control: Control<UserSignInData>;
  errors: FieldErrors<UserSignInData>;
  clearErrors: UseFormClearErrors<UserSignInData>;
};

export const UserForm = ({ control, errors, clearErrors }: UserFormProps) => {
  return (
    <>
      <FormLabel text={"Name"} errors={errors.name} />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            placeholder="Name"
            variant={errors.name ? "error" : "default"}
            onChange={(e) => {
              clearErrors("name");
              onChange(e);
            }}
          />
        )}
      />
      <FormLabel text={"Surname"} errors={errors.surname} />
      <Controller
        control={control}
        name="surname"
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            placeholder="Surname"
            variant={errors.surname ? "error" : "default"}
            onChange={(e) => {
              clearErrors("surname");
              onChange(e);
            }}
          />
        )}
      />
    </>
  );
};
