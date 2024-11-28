import { useEffect, useState } from "react";
import { PetitionField } from "../../../../../../types";
import { getPetition, savePetition } from "../../../../../../services";
import { useAppSelector } from "../../../../../../redux/hooks";
import { selectUserID } from "../../../../../../redux/accountSlice";
import { useLoadingAndErrorMessages } from "../../../../../../hooks";

export const usePetitionFields = () => {
  const userID = useAppSelector(selectUserID);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [turnNew, setTurnNew] = useState(false);
  const [turnEdit, setTurnEdit] = useState(-1);
  const [fields, setFields] = useState<Array<PetitionField>>([]);
  const { loadingMessage, setLoadingMessage, errorMessage, setErrorMessage } =
    useLoadingAndErrorMessages(
      "Loading fields...",
      "Unable to load petition data."
    );

  useEffect(() => {
    loadPetitionData();
  }, []);

  const loadPetitionData = () => {
    setErrorMessage("Loading fields...");
    setLoading(true);
    setError(false);
    (async () => {
      try {
        const dbPetitionFields = await getPetition(userID);
        setFields(dbPetitionFields);
      } catch (error) {
        setErrorMessage("Unable to load petition data.");
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleNewField = (createNew: boolean) => {
    setTurnNew(createNew);
  };

  const handleFieldEdit = (index: number) => {
    setTurnEdit(index);
  };

  const handleFieldDelete = (index: number) => {
    setFields((prevFields) => prevFields.filter((_, i) => i !== index));
  };

  const save = async () => {
    setLoadingMessage("Saving...");
    setLoading(true);
    setError(false);
    try {
      await savePetition(fields, userID);
      setDisabled(true);
    } catch (error) {
      setErrorMessage("Unable to save petition");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const editField = (field: PetitionField) => {
    setFields((prevFields) => {
      prevFields[turnEdit] = field;
      return prevFields;
    });
    setDisabled(false);
  };

  const addField = (field: PetitionField) => {
    setFields([...fields, field]);
    setDisabled(false);
  };

  return {
    loadingMessage,
    loading,
    errorMessage,
    error,
    disabled,
    turnNew,
    turnEdit,
    fields,
    loadPetitionData,
    editField,
    addField,
    save,
    handleNewField,
    handleFieldEdit,
    handleFieldDelete,
  };
};
