import { useEffect, useState } from "react";
import { getShelterAnimals } from "../../../../services";
import { Animal } from "../../../../types";

export const useAnimals = (userID: string | null) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [turnNew, setTurnNew] = useState(false);
  const [turnEdit, setTurnEdit] = useState(-1);
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

  const saveAnimals = async () => {
    if (!userID) {
      return;
    }

    setLoading(true);
    // TO DO
    setDisabled(true);
    setLoading(false);
  };

  const handleNewAnimal = (createNew: boolean) => {
    setTurnNew(createNew);
  };

  const handleAnimalEdit = (index: number) => {
    setTurnEdit(index);
  };

  const editAnimal = (animal: Animal) => {
    setAnimals((prevAnimals) => {
      prevAnimals[turnEdit] = animal;
      return prevAnimals;
    });
    setDisabled(false);
  };

  const addAnimal = (animal: Animal) => {
    setAnimals([...animals, animal]);
    setDisabled(false);
  };

  return {
    loading,
    error,
    disabled,
    turnNew,
    turnEdit,
    animals,
    loadAnimalsData,
    saveAnimals,
    handleNewAnimal,
    handleAnimalEdit,
    editAnimal,
    addAnimal,
  };
};
