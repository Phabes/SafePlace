import { PETITION_STATUSES } from "../../../../constants/petitionStatuses";
import { SignedPetitionsUserFormat } from "../../../../types";

export const sortPetitionByStatus = (
  petitions: Array<SignedPetitionsUserFormat>
) => {
  return petitions.sort(
    (a, b) =>
      PETITION_STATUSES.indexOf(a.status) - PETITION_STATUSES.indexOf(b.status)
  );
};
