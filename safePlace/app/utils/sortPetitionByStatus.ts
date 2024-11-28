import { SignedPetitionsBaseFormat } from "../types";

export const sortPetitionByStatus = <T extends readonly string[]>(
  petitions: Array<SignedPetitionsBaseFormat>,
  statuses: T
) => {
  return petitions.sort(
    (a, b) => statuses.indexOf(a.status) - statuses.indexOf(b.status)
  );
};
