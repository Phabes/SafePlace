import * as Yup from "yup";
import { HOUSING_AREA_TYPES, HOUSING_TYPES, USER_EXPIERIENCE_TYPES, USER_LIFESTYLE_TYPES } from "../../../../constants/userProfilTypes";
import { HousingAreaTypes, HousingTypes, UserExpierienceTypes, UserLifestyleTypes } from "../../../../types/User";
import { AdditionalUserData, DatabaseUser } from "../../../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

const userProfileSchema = Yup.object().shape({
  age: Yup.number(),
  experience: Yup.mixed<UserExpierienceTypes>().oneOf(USER_EXPIERIENCE_TYPES),
  lifestyle: Yup.mixed<UserLifestyleTypes>().oneOf(USER_LIFESTYLE_TYPES),
  housing: Yup.mixed<HousingTypes>().oneOf(HOUSING_TYPES),
  area: Yup.mixed<HousingAreaTypes>().oneOf(HOUSING_AREA_TYPES),
  profilePhoto: Yup.string(),
  backgroundPhoto:Yup.string(),
});

export const useUserData = (userDB?: DatabaseUser) => {
  const user:AdditionalUserData | undefined = userDB?{
    age: userDB.details.age,
    experience: userDB.details.experience,
    housing: userDB.details.housing,
    area: userDB.details.area,
    lifestyle: userDB.details.lifestyle,
    profilePhoto: userDB.details.profilePhoto,
    backgroundPhoto: userDB.details.backgroundPhoto,
  }
  : undefined;

  const {
    control: userProfileControl,
    handleSubmit: handleUserProfileSubmit,
    formState: { errors: userProfileErrors },
  } = useForm<AdditionalUserData>({
    defaultValues: {
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