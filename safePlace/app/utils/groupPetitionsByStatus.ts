import { SignedPetitionsBaseFormat } from "../types";

export const groupPetitionsByStatus = <T extends readonly string[]>(
  petitions: Array<SignedPetitionsBaseFormat>,
  statuses: T
) => {
  const groupedPetitions: {
    [key: string]: Array<SignedPetitionsBaseFormat>;
  } = {};

  statuses.forEach((status) => (groupedPetitions[status] = []));

  petitions.forEach((petition) => {
    groupedPetitions[petition.status].push(petition);
  });

  return groupedPetitions;
};
