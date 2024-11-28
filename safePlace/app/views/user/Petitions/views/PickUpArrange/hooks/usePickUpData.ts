import { useEffect, useState } from "react";
import { useLoadingAndErrorMessages } from "../../../../../../hooks";
import { getPetitionCoreData } from "../../../../../../services";

export const usePickUpData = (petitionID: string, close: () => void) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [petitionCoreData, setPetitionCoreData] = useState<{
    animalName: string;
    shelterName: string;
    userName: string;
  }>();
  const { loadingMessage, setLoadingMessage, errorMessage, setErrorMessage } =
    useLoadingAndErrorMessages(
      "Loading data...",
      "Unable to load pick up data."
    );

  useEffect(() => {
    loadPickUpData();
  }, []);

  const loadPickUpData = async () => {
    setLoading(true);
    setError(false);
    try {
      const petitionData = await getPetitionCoreData(petitionID);
      setPetitionCoreData(petitionData);
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    loadingMessage,
    errorMessage,
    petitionCoreData,
    loadPickUpData,
  };
};
