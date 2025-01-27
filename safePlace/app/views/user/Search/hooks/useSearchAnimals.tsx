import { useEffect, useState } from "react";
import { AdditionalUserData, AnimalDB } from "../../../../types";
import {
  addAnimalToFavourites,
  deleteAnimalFromFavourites,
  getSearchAnimals,
  getUserData,
  getUserFavouriteAnimals,
  getUserValidStatusFilledPetitionAnimals,
} from "../../../../services";
import { DocumentReference } from "firebase/firestore";
import { EMPTY_USER_DETAILS } from "../../../../constants/emptyUserDetails";
import { Filter } from "../../../../constants/filterType";
import { filterAnimals } from "../utils/filterAnimals";

export const useSearchAnimals = (userID: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [allAnimals, setAllAnimals] = useState<Array<AnimalDB>>([]);
  const [animals, setAnimals] = useState<Array<AnimalDB>>([]);
  const [favourite, setFavourite] = useState<Array<DocumentReference>>([]);
  const [filled, setFilled] = useState<Array<string>>([]);
  const [userDetails, setUserDetails] = useState<AdditionalUserData>(EMPTY_USER_DETAILS);

  useEffect(() => {
    loadAvailableAnimals();
  }, []);

  const loadAvailableAnimals = () => {
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const favouriteAnimals = await getUserFavouriteAnimals(userID);
        
        const filledAnimals = await getUserValidStatusFilledPetitionAnimals(
          userID
        );
        const dbSearchAnimals = await getSearchAnimals();
        setFavourite(favouriteAnimals);
        setFilled(filledAnimals);
        setAllAnimals(dbSearchAnimals);
        setAnimals(dbSearchAnimals);
        const userProfile = await getUserData(userID);
        setUserDetails(userProfile.data()  ? userProfile.data().details : EMPTY_USER_DETAILS);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  const addToFilled = async (animalID: string, notInFavourite: boolean) => {
    setLoading(true);
    try {
      if (notInFavourite) {
        await addFavourite(animalID);
      }
      setFilled((prevFilled) => [...prevFilled, animalID]);
    } catch (error) {
    } finally {
      setLoading(false);
    }
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
  const clearFilter = ()=>{
    loadAvailableAnimals();
  }
  const filterAnimalsDB = (filter:Filter)=>{
    const filteredAnimals = filterAnimals(allAnimals,filter,userDetails)
    setAnimals(filteredAnimals)
  }


  return {
    loading,
    error,
    animals,
    filled,
    favourite,
    filterAnimalsDB,
    clearFilter,
    loadAvailableAnimals,
    addToFilled,
    addFavourite,
    deleteFavourite,
  };
};
