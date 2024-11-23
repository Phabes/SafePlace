import { useEffect, useState } from "react";
import { AnimalDB } from "../../../../types";
import {
  addAnimalToFavourites,
  deleteAnimalFromFavourites,
  getSearchAnimals,
  getUserFavouriteAnimals,
  getUserFilledPetitionAnimals,
} from "../../../../services";
import { DocumentReference } from "firebase/firestore";

export const useSearchAnimals = (userID: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [animals, setAnimals] = useState<Array<AnimalDB>>([]);
  const [favourite, setFavourite] = useState<Array<DocumentReference>>([]);
  const [filled, setFilled] = useState<Array<string>>([]);

  useEffect(() => {
    loadAvailableAnimals();
  }, []);

  const loadAvailableAnimals = () => {
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const favouriteAnimals = await getUserFavouriteAnimals(userID);
        const filledAnimals = await getUserFilledPetitionAnimals(userID);
        const dbSearchAnimals = await getSearchAnimals();
        setFavourite(favouriteAnimals);
        setFilled(filledAnimals);
        setAnimals(dbSearchAnimals);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  const addToFilled = async (animalID: string, notInFavourite: boolean) => {
    if (notInFavourite) {
      await addFavourite(animalID);
    }
    setFilled((prevFilled) => {
      return [...prevFilled, animalID];
    });
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
    filled,
    favourite,
    loadAvailableAnimals,
    addToFilled,
    addFavourite,
    deleteFavourite,
  };
};
