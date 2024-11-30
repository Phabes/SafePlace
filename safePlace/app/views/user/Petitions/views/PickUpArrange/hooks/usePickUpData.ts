import { useEffect, useState } from "react";
import { useLoadingAndErrorMessages } from "../../../../../../hooks";
import { getPetitionCoreData } from "../../../../../../services";
import { savePickUp } from "../../../../../../services/schedule";
import { usePickUpForm } from "./usePickUpForm";
import { PetitionStatus } from "../../../../../../types";
import { getPickUp } from "../../../../../../services/schedule/schedule";

export const usePickUpData = (
  petitionID: string,
  petitionStatus: PetitionStatus,
  close: () => void
) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [petitionCoreData, setPetitionCoreData] = useState<{
    animalName: string;
    shelterName: string;
    userName: string;
  }>();
  const {
    date,
    setDate,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
  } = usePickUpForm();
  const { loadingMessage, setLoadingMessage, errorMessage, setErrorMessage } =
    useLoadingAndErrorMessages(
      "Loading data...",
      "Unable to load pick up data."
    );

  useEffect(() => {
    loadPickUpData();
  }, []);

  const loadPickUpData = async () => {
    setLoadingMessage("Loading data...");
    setLoading(true);
    setError(false);
    try {
      const petitionData = await getPetitionCoreData(petitionID);
      setPetitionCoreData(petitionData);
      if (petitionStatus === "In-Progress") {
        const scheduleDate = await getPickUp(petitionID);
        if (scheduleDate) {
          setDate(scheduleDate);
        }
      }
    } catch (error) {
      setErrorMessage("Unable to load pick up data.");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const schedulePickUp = async () => {
    setLoadingMessage("Scheduling pick up");
    setLoading(true);
    setError(false);
    try {
      await savePickUp(petitionID, date);
      close();
    } catch (error) {
      setErrorMessage("Error during scheduling pick up");
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
    schedulePickUp,
    date,
    setDate,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
  };
};
