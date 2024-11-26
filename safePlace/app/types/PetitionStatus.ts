import { PETITION_STATUSES } from "../constants/petitionStatuses";

export type PetitionStatus = (typeof PETITION_STATUSES)[number];

export type SignedPetitionsUserFormat = {
  filledPetitionID: string;
  animalsName: string;
  status: PetitionStatus;
};
