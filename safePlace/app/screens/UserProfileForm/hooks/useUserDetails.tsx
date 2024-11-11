import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInData } from "../../../types";
import { AdditionalUserData } from "../../../types/userAccount";

const userDetailSchema = Yup.object().shape({
  age: Yup.number(),
  experience: Yup.string(),
  housing: Yup.string(),
  area: Yup.string(),
  lifestyle: Yup.string(),
  profilePhoto: Yup.string(),
  backgroundPhoto: Yup.string()
});

export const useUserDetails = () => {
  const {
    control: detailsControl,
    handleSubmit: handleDetailsSubmit,
    formState: { errors: detailsErrors },
    clearErrors: clearDetailsErrors,
    reset: detailsReset,
  } = useForm<AdditionalUserData>({
    defaultValues: {
      age: 0,
      experience: "",
      housing: "",
      area: "",
      lifestyle: "",
      profilePhoto: "",
      backgroundPhoto: ""
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(userDetailSchema),
  });

  return {
    detailsControl,
    handleDetailsSubmit,
    detailsErrors,
    clearDetailsErrors,
    detailsReset,
  };
};
