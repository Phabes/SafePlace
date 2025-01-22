import * as Yup from "yup";
import { HOUSING_AREA_TYPES, HOUSING_TYPES, USER_EXPIERIENCE_TYPES, USER_LIFESTYLE_TYPES } from "../../../../constants/userProfilTypes";
import { HousingAreaTypes, HousingTypes, UserExpierienceTypes, UserLifestyleTypes } from "../../../../types/User";
import { AdditionalShelterData, AdditionalUserData, DatabaseUser } from "../../../../types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

// const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const phoneRegExp = /^\+(?:[0-9]•?){6,14}[0-9]$/;

const shelterProfileSchema = Yup.object().shape({
  contactEmail: Yup.string().email("Invalid email").default(""),
  phoneNumber: Yup.string().matches(phoneRegExp, 'Invalid phone number').default(""),
  profilePhoto: Yup.string().default(""),
  backgroundPhoto: Yup.string().default(""),
});

export const useShelterData = (shelterDetails: AdditionalShelterData) => {
  const shelter: AdditionalShelterData = shelterDetails

  const {
    control: shelterProfileControl,
    handleSubmit: handleShelterProfileSubmit,
    formState: { errors: shelterProfileErrors },
  } = useForm<AdditionalShelterData>({
    values: {
      ...shelter
    },
    resolver: yupResolver(shelterProfileSchema),

  });

  return {
    shelterProfileControl,
    handleShelterProfileSubmit,
    shelterProfileErrors,
  };
};