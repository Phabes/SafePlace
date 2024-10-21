import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import {
  CommonSignUpData,
  ShelterSignUpData,
  UserSignUpData,
} from "../../../types";

const commonSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Needed at least 6 characters")
    .required("Password is required"),
  repeatPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Password is required"),
});

const shelterSchema = Yup.object().shape({
  shelterName: Yup.string().required("Shelter Name is required"),
});

const userSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  surname: Yup.string().required("Surname is required"),
});

export const useSignUpData = () => {
  const {
    control: commonControl,
    handleSubmit: handleCommonSubmit,
    formState: { errors: commonErrors },
    clearErrors: clearCommonErrors,
    reset: commonReset,
  } = useForm<CommonSignUpData>({
    defaultValues: {
      email: "q@q.com",
      password: "qqqqqq",
      repeatPassword: "qqqqqq",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(commonSchema),
  });

  const {
    control: shelterControl,
    handleSubmit: handleShelterSubmit,
    formState: { errors: shelterErrors },
    clearErrors: clearShelterErrors,
    reset: shelterReset,
  } = useForm<ShelterSignUpData>({
    defaultValues: {
      shelterName: "",
    },
    reValidateMode: "onSubmit",
    resolver: yupResolver(shelterSchema),
  });

  const {
    control: userControl,
    handleSubmit: handleUserSubmit,
    formState: { errors: userErrors },
    clearErrors: clearUserErrors,
    reset: userReset,
  } = useForm<UserSignUpData>({
    defaultValues: { name: "QWE", surname: "DSA" },
    reValidateMode: "onSubmit",
    resolver: yupResolver(userSchema),
  });

  const resetSignUp = () => {
    commonReset();
    shelterReset();
    userReset();
  };

  return {
    commonControl,
    handleCommonSubmit,
    commonErrors,
    clearCommonErrors,
    shelterControl,
    handleShelterSubmit,
    shelterErrors,
    clearShelterErrors,
    userControl,
    handleUserSubmit,
    userErrors,
    clearUserErrors,
    resetSignUp,
  };
};
