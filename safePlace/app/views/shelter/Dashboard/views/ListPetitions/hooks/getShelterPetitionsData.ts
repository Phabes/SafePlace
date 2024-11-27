import { useEffect, useState } from "react";
import { SignedPetitionsShelterFormat } from "../../../../../../types";
import { getShelterFilledPetitions } from "../../../../../../services";

export const getShelterPetitionsData = (userID: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [petitionData, setPetitionData] = useState<
    Array<SignedPetitionsShelterFormat>
  >([]);

  useEffect(() => {
    loadPetitionsData();
  }, []);

  const loadPetitionsData = () => {
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const petitions = await getShelterFilledPetitions(userID);
        setPetitionData(petitions);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  return { loading, error, petitionData, loadPetitionsData };
};
