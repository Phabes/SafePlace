import { useEffect, useState } from "react";
import {
  editAnimalDB,
  getShelterAnimals,
  saveAnimalDB,
} from "../../../../services";
import { Animal, AnimalDB } from "../../../../types";

export const useAnimals = (userID: string | null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [turnNew, setTurnNew] = useState(false);
  const [turnEdit, setTurnEdit] = useState(-1);
  const [animals, setAnimals] = useState<Array<AnimalDB>>([]);

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

  const handleNewAnimal = (createNew: boolean) => {
    setTurnNew(createNew);
  };

  const handleAnimalEdit = (index: number) => {
    setTurnEdit(index);
  };

  const editAnimal = async (animal: AnimalDB) => {
    setLoading(true);
    handleAnimalEdit(-1);
    try {
      await editAnimalDB(animal);

      setAnimals((prevAnimals) => {
        prevAnimals[turnEdit] = animal;
        return prevAnimals;
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const addAnimal = async (animal: Animal) => {
    if (!userID) {
      return;
    }

    setLoading(true);
    handleNewAnimal(false);
    try {
      const createdAnimal = await saveAnimalDB(animal, userID);

      setAnimals((prevAnimals) => {
        prevAnimals.push({
          id: createdAnimal.id,
          ...animal,
        });
        return prevAnimals;
      });
    } catch (error) {
      console.log(error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    turnNew,
    turnEdit,
    animals,
    loadAnimalsData,
    handleNewAnimal,
    handleAnimalEdit,
    editAnimal,
    addAnimal,
  };
};
