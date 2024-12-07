import { useEffect, useState } from "react";
import {
  getAllPetitionsWithAnimal,
  getPetitionAnimal,
  getPetitionAnswers,
  setAnimalAvailability,
  setPetitionStatus,
} from "../../../../../../../../services";
import {
  PetitionAnswer,
  PetitionStatus,
  SignedPetitionsShelterFormat,
} from "../../../../../../../../types";
import { useLoadingAndErrorMessages } from "../../../../../../../../hooks";
import { getPickUp } from "../../../../../../../../services/schedule";

export const useShelterPetitionAnswers = (
  petition: SignedPetitionsShelterFormat,
  close: () => void
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<PetitionAnswer>>([]);
  const [pickUpDate, setPickUpDate] = useState<Date>();
  const { loadingMessage, setLoadingMessage, errorMessage, setErrorMessage } =
    useLoadingAndErrorMessages(
      "Loading answers...",
      "Unable to load petition answers."
    );

  useEffect(() => {
    loadPetitionAnswers();
  }, []);

  const loadPetitionAnswers = async () => {
    setLoading(true);
    setError(false);
    try {
      const petitionAnswers = await getPetitionAnswers(
        petition.filledPetitionID
      );
      setUserAnswers(petitionAnswers);
      const scheduledDate = await getPickUp(petition.filledPetitionID);
      setPickUpDate(scheduledDate);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const setAnimalAsTaken = async () => {
    const animalRef = await getPetitionAnimal(petition.filledPetitionID);
    await setAnimalAvailability(animalRef.id, false);

    const animalPetitions = await getAllPetitionsWithAnimal(animalRef);
    const filteredAnimalPetitions = animalPetitions.filter(
      (petitionID) => petitionID !== petition.filledPetitionID
    );

    for (const animalPetition of filteredAnimalPetitions) {
      await setPetitionStatus(animalPetition, "Closed");
    }
  };

  const donePetition = () => {
    setLoadingMessage("Closing...");
    changePetitionStatus("Done", setAnimalAsTaken);
  };

  const acceptPetition = () => {
    setLoadingMessage("Accepting...");
    changePetitionStatus("Accepted");
  };

  const pendingPetition = () => {
    setLoadingMessage("Pending...");
    changePetitionStatus("Pending");
  };

  const declinePetition = () => {
    setLoadingMessage("Declining...");
    changePetitionStatus("Declined");
  };

  const changePetitionStatus = async (
    status: PetitionStatus,
    additionalModifications?: () => Promise<void>
  ) => {
    setLoading(true);
    setError(false);
    try {
      await setPetitionStatus(petition.filledPetitionID, status);
      if (additionalModifications) {
        await additionalModifications();
      }
      close();
    } catch (error) {
      setErrorMessage("Unable to change status");
      setError(true);
      setLoadingMessage("Loading answers...");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    loadingMessage,
    errorMessage,
    loadPetitionAnswers,
    userAnswers,
    pickUpDate,
    donePetition,
    acceptPetition,
    pendingPetition,
    declinePetition,
  };
};
