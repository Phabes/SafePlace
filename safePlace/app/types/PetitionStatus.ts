import { PETITION_STATUSES_USER } from "../constants/petitionStatuses";

export type PetitionStatus = (typeof PETITION_STATUSES_USER)[number];

export interface SignedPetitionsBaseFormat {
  filledPetitionID: string;
  animalName: string;
  status: PetitionStatus;
}

export interface SignedPetitionsUserFormat extends SignedPetitionsBaseFormat {
  shelterName: string;
}

export interface SignedPetitionsShelterFormat
  extends SignedPetitionsBaseFormat {
  userName: string;
}
