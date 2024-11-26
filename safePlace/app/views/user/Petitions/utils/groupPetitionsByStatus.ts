import { PETITION_STATUSES } from "../../../../constants/petitionStatuses";
import { SignedPetitionsUserFormat } from "../../../../types";

export const groupPetitionsByStatus = (
  petitions: Array<SignedPetitionsUserFormat>
) => {
  const groupedPetitions: { [key: string]: Array<SignedPetitionsUserFormat> } =
    {};

  PETITION_STATUSES.forEach((status) => (groupedPetitions[status] = []));

  petitions.forEach((petition) => {
    groupedPetitions[petition.status].push(petition);
  });

  return groupedPetitions;
};
