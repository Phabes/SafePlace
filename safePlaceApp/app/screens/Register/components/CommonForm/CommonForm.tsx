import { Input, Typography } from "@/app/components";
import { Control, Controller } from "react-hook-form";
import { CommonSignInData } from "@/app/types";

type CommonFormProps = {
  control: Control<CommonSignInData>;
  repeatPasswordError: boolean;
  setRepeatPasswordError: (x: boolean) => void;
};

export const CommonForm = ({
  control,
  repeatPasswordError,
  setRepeatPasswordError,
}: CommonFormProps) => {
  return (
    <>
      <Typography text={"Email:"} />
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            keyboardType="email-address"
            placeholder="Email"
            autoCapitalize="none"
            onChange={onChange}
          />
        )}
      />
      <Typography text={"Password:"} />
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            placeholder="Password"
            autoCapitalize="none"
            password={true}
            onChange={(e) => {
              onChange(e);
              setRepeatPasswordError(false);
            }}
          />
        )}
      />
      <Typography text={"Repeat Password:"} />
      <Controller
        control={control}
        name="repeatPassword"
        render={({ field: { onChange, value } }) => (
          <Input
            text={value}
            placeholder="Password"
            autoCapitalize="none"
            password={true}
            variant={repeatPasswordError ? "error" : "default"}
            onChange={(e) => {
              onChange(e);
              setRepeatPasswordError(false);
            }}
          />
        )}
      />
    </>
  );
};
