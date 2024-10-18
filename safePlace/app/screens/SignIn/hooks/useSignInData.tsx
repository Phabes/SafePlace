import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { SignInData } from "../../../types";

const loginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Needed at least 6 characters")
    .required("Password is required"),
});

export const useSignInData = () => {
  const {
    control: loginControl,
    handleSubmit: handleLoginSubmit,
    formState: { errors: loginErrors },
    clearErrors: clearLoginErrors,
  } = useForm<SignInData>({
    defaultValues: {
      email: "",
      password: "",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(loginSchema),
  });

  return {
    loginControl,
    handleLoginSubmit,
    loginErrors,
    clearLoginErrors,
  };
};
