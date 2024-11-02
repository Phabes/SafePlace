import { useEffect, useState } from "react";
import { getShelterAnimals } from "../../../../services";
import { Animal } from "../../../../types";

export const useAnimals = (userID: string | null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [animals, setAnimals] = useState<Array<Animal>>([]);

  useEffect(() => {
    loadAnimalsData();
  }, []);

  const loadAnimalsData = () => {
    if (!userID) {
      return;
    }

    setLoading(true);
    setError(false);
    (async () => {
      try {
        const dbShelterAnimals = await getShelterAnimals(userID);
        setAnimals(dbShelterAnimals);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  return { loading, error, animals, loadAnimalsData };
};
