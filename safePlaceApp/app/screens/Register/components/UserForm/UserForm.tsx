import { Input, Typography } from "@/app/components";
import { UserSignInData } from "@/app/types";
import { Control, Controller } from "react-hook-form";

type UserFormProps = {
  control: Control<UserSignInData>;
};

export const UserForm = ({ control }: UserFormProps) => {
  return (
    <>
      <Typography text={"Name:"} />
      <Controller
        control={control}
        name="name"
        render={({ field: { onChange, value } }) => (
          <Input text={value} placeholder="Name" onChange={onChange} />
        )}
      />
      <Typography text={"Surname:"} />
      <Controller
        control={control}
        name="surname"
        render={({ field: { onChange, value } }) => (
          <Input text={value} placeholder="Surname" onChange={onChange} />
        )}
      />
    </>
  );
};
