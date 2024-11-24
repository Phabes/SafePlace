import { useEffect, useState } from "react";
import { getUserFilledPetitions } from "../../../../services";

export const getPetitionsData = (userID: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [petitionData, setPetitionData] = useState<
    Array<{
      animalsName: string;
      status: string;
    }>
  >([]);

  useEffect(() => {
    loadPetitionsData();
  }, []);

  const loadPetitionsData = () => {
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const petitions = await getUserFilledPetitions(userID);
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
