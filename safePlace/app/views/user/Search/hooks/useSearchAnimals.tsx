import { useEffect, useState } from "react";
import { AnimalDB } from "../../../../types";
import {
  addAnimalToFavourites,
  deleteAnimalFromFavourites,
  getSearchAnimals,
  getUserFavouriteAnimals,
} from "../../../../services";
import { DocumentReference } from "firebase/firestore";

export const useSearchAnimals = (userID: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [animals, setAnimals] = useState<Array<AnimalDB>>([]);
  const [favourite, setFavourite] = useState<Array<DocumentReference>>([]);

  useEffect(() => {
    loadAvailableAnimals();
  }, []);

  const loadAvailableAnimals = () => {
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const dbSearchAnimals = await getSearchAnimals();
        const favouriteAnimals = await getUserFavouriteAnimals(userID);
        setFavourite(favouriteAnimals);
        setAnimals(dbSearchAnimals);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  const addFavourite = async (animalID: string) => {
    try {
      const updatedFavourites = await addAnimalToFavourites(
        userID,
        favourite,
        animalID
      );

      setFavourite(updatedFavourites);
    } catch (error) {}
  };

  const deleteFavourite = async (animalID: string) => {
    try {
      const updatedFavourites = await deleteAnimalFromFavourites(
        userID,
        favourite,
        animalID
      );

      setFavourite(updatedFavourites);
    } catch (error) {}
  };

  return {
    loading,
    error,
    animals,
    favourite,
    loadAvailableAnimals,
    addFavourite,
    deleteFavourite,
  };
};
