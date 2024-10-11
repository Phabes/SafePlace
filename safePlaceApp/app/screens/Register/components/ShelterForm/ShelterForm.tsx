import { Input, Typography } from "@/app/components";
import { Control, Controller } from "react-hook-form";
import { ShelterSignInData } from "@/app/types";

type ShelterFormProps = {
  control: Control<ShelterSignInData>;
};

export const ShelterForm = ({ control }: ShelterFormProps) => {
  return (
    <>
      <Typography text={"Shelter Name:"} />
      <Controller
        control={control}
        name="shelterName"
        render={({ field: { onChange, value } }) => (
          <Input text={value} placeholder="Shelter Name" onChange={onChange} />
        )}
      />
    </>
  );
};
