import { useEffect, useState } from "react";
import {
  getPetitionAnswers,
  setPetitionStatus,
} from "../../../../../../../../services";
import {
  PetitionAnswer,
  PetitionStatus,
  SignedPetitionsShelterFormat,
} from "../../../../../../../../types";
import { useLoadingAndErrorMessages } from "../../../../../../../../hooks";

export const useShelterPetitionAnswers = (
  petition: SignedPetitionsShelterFormat,
  close: () => void
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Array<PetitionAnswer>>([]);
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
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const acceptPetition = () => {
    setLoadingMessage("Accepting...");
    changePetitionStatus("Accepted");
  };

  const pendingPetition = async () => {
    setLoadingMessage("Pending...");
    changePetitionStatus("Pending");
  };

  const declinePetition = async () => {
    setLoadingMessage("Declining...");
    changePetitionStatus("Declined");
  };

  const changePetitionStatus = async (status: PetitionStatus) => {
    setLoading(true);
    setError(false);
    try {
      await setPetitionStatus(petition.filledPetitionID, status);
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
    acceptPetition,
    pendingPetition,
    declinePetition,
  };
};
