import { PETITION_STATUSES_USER } from "../constants/petitionStatuses";

export type PetitionStatus = (typeof PETITION_STATUSES_USER)[number];

export interface SignedPetitionsUserFormat {
  filledPetitionID: string;
  animalsName: string;
  status: PetitionStatus;
}

export interface SignedPetitionsShelterFormat
  extends SignedPetitionsUserFormat {
  userName: string;
}
