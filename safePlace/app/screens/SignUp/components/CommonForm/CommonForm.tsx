import {
  Control,
  Controller,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";
import { CommonSignInData } from "../../../../types";
import { FormLabel, Input } from "../../../../components";

type CommonFormProps = {
  control: Control<CommonSignInData>;
  errors: FieldErrors<CommonSignInData>;
  clearErrors: UseFormClearErrors<CommonSignInData>;
};

export const CommonForm = ({
  control,
  errors,
  clearErrors,
}: CommonFormProps) => {
  return (
    <>
      <FormLabel text={"Email"} errors={errors.email} />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            variant={errors.email ? "error" : "default"}
            onChange={(e) => {
              clearErrors("email");
              onChange(e);
            }}
          />
        )}
      />
      <FormLabel text={"Password"} errors={errors.password} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            placeholder="Password"
            autoCapitalize="none"
            variant={errors.password ? "error" : "default"}
            password={true}
            onChange={(e) => {
              clearErrors("password");
              onChange(e);
            }}
          />
        )}
      />
      <FormLabel text={"Repeat Password"} errors={errors.repeatPassword} />
      <Controller
        control={control}
        name="repeatPassword"
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            placeholder="Password"
            autoCapitalize="none"
            variant={errors.repeatPassword ? "error" : "default"}
            password={true}
            onChange={(e) => {
              clearErrors("repeatPassword");
              onChange(e);
            }}
          />
        )}
      />
    </>
  );
};
