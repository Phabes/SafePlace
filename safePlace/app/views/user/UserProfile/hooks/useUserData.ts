import * as Yup from "yup";
import { HOUSING_AREA_TYPES, HOUSING_TYPES, USER_EXPIERIENCE_TYPES, USER_LIFESTYLE_TYPES } from "../../../../constants/userProfilTypes";
import { HousingAreaTypes, HousingTypes, UserExpierienceTypes, UserLifestyleTypes } from "../../../../types/User";
import { AdditionalUserData, DatabaseUser } from "../../../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userProfileSchema = Yup.object().shape({
  age: Yup.number().default(0),
  experience: Yup.mixed<UserExpierienceTypes>().oneOf(USER_EXPIERIENCE_TYPES).default(""),
  lifestyle: Yup.mixed<UserLifestyleTypes>().oneOf(USER_LIFESTYLE_TYPES).default(""),
  housing: Yup.mixed<HousingTypes>().oneOf(HOUSING_TYPES).default(""),
  area: Yup.mixed<HousingAreaTypes>().oneOf(HOUSING_AREA_TYPES).default(""),
  profilePhoto: Yup.string().default(""),
  backgroundPhoto: Yup.string().default(""),
});

export const useUserData = (userDetails: AdditionalUserData) => {
  const user: AdditionalUserData = userDetails

  const {
    control: userProfileControl,
    handleSubmit: handleUserProfileSubmit,
    formState: { errors: userProfileErrors },
  } = useForm<AdditionalUserData>({
    values: {
      ...user
    },
    resolver: yupResolver(userProfileSchema),

  });

  return {
    userProfileControl,
    handleUserProfileSubmit,
    userProfileErrors,
  };
};