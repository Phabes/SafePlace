import { PETITION_STATUSES_USER } from "../../../../constants/petitionStatuses";
import { SignedPetitionsUserFormat } from "../../../../types";

export const sortPetitionByStatus = (
  petitions: Array<SignedPetitionsUserFormat>
) => {
  return petitions.sort(
    (a, b) =>
      PETITION_STATUSES_USER.indexOf(a.status) -
      PETITION_STATUSES_USER.indexOf(b.status)
  );
};
