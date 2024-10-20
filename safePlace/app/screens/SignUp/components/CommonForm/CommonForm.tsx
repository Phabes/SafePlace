import {
  Control,
  Controller,
  FieldError,
  FieldErrors,
  UseFormClearErrors,
} from "react-hook-form";
import { FormLabel, Input } from "../../../../components";
import { CommonSignUpData } from "../../../../types";

type CommonFormProps = {
  control: Control<CommonSignUpData>;
  errors: FieldErrors<CommonSignUpData>;
  clearErrors: UseFormClearErrors<CommonSignUpData>;
  signUpError: FieldError | null;
  signUpEmailInputChange: () => void;
};

export const CommonForm = ({
  control,
  errors,
  clearErrors,
  signUpError,
  signUpEmailInputChange,
}: CommonFormProps) => {
  return (
    <>
      <FormLabel
        text={"Email"}
        errors={signUpError ? signUpError : errors.email}
      />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value, name } }) => (
          <Input
            text={value}
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            variant={signUpError ? "error" : errors.email ? "error" : "default"}
            onChange={(e) => {
              signUpEmailInputChange();
              clearErrors(name);
              onChange(e);
            }}
          />
        )}
      />
      <FormLabel text={"Password"} errors={errors.password} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value, name } }) => (
          <Input
            text={value}
            placeholder="Password"
            autoCapitalize="none"
            variant={errors.password ? "error" : "default"}
            password={true}
            onChange={(e) => {
              clearErrors(name);
              onChange(e);
            }}
          />
        )}
      />
      <FormLabel text={"Repeat Password"} errors={errors.repeatPassword} />
      <Controller
        control={control}
        name="repeatPassword"
        render={({ field: { onChange, value, name } }) => (
          <Input
            text={value}
            placeholder="Password"
            autoCapitalize="none"
            variant={errors.repeatPassword ? "error" : "default"}
            password={true}
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
