import { AdditionalUserData } from "../types";

export const USER_EXPIERIENCE_TYPES = [
  "",
  "None",
  "Little Experience",
  "Experienced",
  "Professional",
] as const;

export const USER_LIFESTYLE_TYPES = [
  "",
  "Sedentary lifestyle",
  "Moderately Active Lifestyle",
  "Active lifestyle",
] as const;

export const HOUSING_TYPES = [
  "",
  "House",
  "Apartment",
] as const;

export const HOUSING_AREA_TYPES = [
  "",
  "Countryside",
  "Small town",
  "Big town",
] as const;

export const EMPTY_USER_DETAILS: AdditionalUserData = {
  age: 0,
  experience: "",
  housing: "",
  area: "",
  lifestyle: "",
  profilePhoto: "",
  backgroundPhoto: ""
}