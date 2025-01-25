import { useEffect, useState } from "react";
import {
  deleteAnimalDB,
  editAnimalDB,
  getShelterAnimals,
  saveAnimalDB,
} from "../../../../services";
import { Animal, AnimalDB } from "../../../../types";
import { useAppSelector } from "../../../../redux/hooks";
import { selectUserID } from "../../../../redux/accountSlice";

export const useAnimals = () => {
  const userID = useAppSelector(selectUserID);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [creating, setCreating] = useState(false);
  const [editing, setEditing] = useState(-1);
  const [deleting, setDeleting] = useState(-1);
  const [animals, setAnimals] = useState<Array<AnimalDB>>([]);

  useEffect(() => {
    loadAnimalsData();
  }, []);

  const loadAnimalsData = () => {
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

  const handleAnimalAdd = (createNew: boolean) => {
    setCreating(createNew);
  };

  const handleAnimalEdit = (index: number) => {
    setEditing(index);
  };

  const handleAnimalDelete = (index: number) => {
    setDeleting(index);
  };

  const editAnimal = async (animal: AnimalDB) => {
    setLoading(true);
    try {
      await editAnimalDB(animal);

      setAnimals((prevAnimals) => {
        prevAnimals[editing] = animal;
        return prevAnimals;
      });
    } catch (error) {
      setError(true);
    } finally {
      handleAnimalEdit(-1);
      setLoading(false);
    }
  };

  const addAnimal = async (animal: Animal) => {
    setLoading(true);
    try {
      const createdAnimal = await saveAnimalDB(animal, userID);

      setAnimals((prevAnimals) => {
        prevAnimals.unshift({
          id: createdAnimal.id,
          shelterID: userID,
          ...animal,
        });
        return prevAnimals;
      });
    } catch (error) {
      setError(true);
    } finally {
      handleAnimalAdd(false);
      setLoading(false);
    }
  };

  const deleteAnimal = async () => {
    if (deleting === -1) {
      return;
    }

    setLoading(true);
    try {
      const deleteIndex = deleting;
      handleAnimalDelete(-1);
      await deleteAnimalDB(animals[deleteIndex].id);

      setAnimals((prevAnimals) => {
        prevAnimals.splice(deleteIndex, 1);
        return prevAnimals;
      });
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    loadAnimalsData,
    animals,
    creating,
    editing,
    deleting,
    handleAnimalAdd,
    handleAnimalEdit,
    handleAnimalDelete,
    addAnimal,
    editAnimal,
    deleteAnimal,
  };
};
