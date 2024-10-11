import {
  CommonSignInData,
  ShelterSignInData,
  UserSignInData,
} from "@/app/types";
import { useForm } from "react-hook-form";

export const useSignUpData = () => {
  const { control: commonControl, getValues: getCommonValues } =
    useForm<CommonSignInData>({
      defaultValues: {
        email: "",
        password: "",
        repeatPassword: "",
      },
    });
  const { control: shelterControl, getValues: getShelterValues } =
    useForm<ShelterSignInData>({
      defaultValues: {
        shelterName: "",
      },
    });
  const { control: userControl, getValues: getUserValues } =
    useForm<UserSignInData>({
      defaultValues: { name: "", surname: "" },
    });

  return {
    commonControl,
    getCommonValues,
    shelterControl,
    getShelterValues,
    userControl,
    getUserValues,
  };
};
