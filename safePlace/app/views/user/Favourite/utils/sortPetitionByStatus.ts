import { PETITION_STATUSES } from "../../../../constants/petitionStatuses";

export const sortPetitionByStatus = (
  petitions: { animalsName: string; status: string }[]
) => {
  return petitions.sort(
    (a, b) =>
      PETITION_STATUSES.indexOf(a.status) - PETITION_STATUSES.indexOf(b.status)
  );
};
