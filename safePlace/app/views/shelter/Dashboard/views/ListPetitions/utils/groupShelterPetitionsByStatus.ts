import { PETITION_STATUSES_SHELTER } from "../../../../../../constants/petitionStatuses";
import { SignedPetitionsShelterFormat } from "../../../../../../types";

export const groupShelterPetitionsByStatus = (
  petitions: Array<SignedPetitionsShelterFormat>
) => {
  const groupedPetitions: {
    [key: string]: Array<SignedPetitionsShelterFormat>;
  } = {};

  PETITION_STATUSES_SHELTER.forEach(
    (status) => (groupedPetitions[status] = [])
  );

  petitions.forEach((petition) => {
    groupedPetitions[petition.status].push(petition);
  });

  return groupedPetitions;
};
