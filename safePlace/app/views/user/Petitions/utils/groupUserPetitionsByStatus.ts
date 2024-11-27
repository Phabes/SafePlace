import { PETITION_STATUSES_USER } from "../../../../constants/petitionStatuses";
import { SignedPetitionsUserFormat } from "../../../../types";

export const groupUserPetitionsByStatus = (
  petitions: Array<SignedPetitionsUserFormat>
) => {
  const groupedPetitions: {
    [key: string]: Array<SignedPetitionsUserFormat>;
  } = {};

  PETITION_STATUSES_USER.forEach((status) => (groupedPetitions[status] = []));

  petitions.forEach((petition) => {
    groupedPetitions[petition.status].push(petition);
  });

  return groupedPetitions;
};
