import { useState } from "react";
import { PetitionRadioOption } from "../../../../../../../types";

export const usePetitionRadioOptions = (
  radios: Array<PetitionRadioOption> = []
) => {
  const [radioOptions, setRadioOptions] =
    useState<Array<PetitionRadioOption>>(radios);

  const handleAddOption = () => {
    setRadioOptions([...radioOptions, { text: "", conforming: false }]);
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...radioOptions];
    updatedOptions[index].text = value;
    setRadioOptions(updatedOptions);
  };

  const handleCheckboxChange = (index: number) => {
    const updatedSelection = [...radioOptions];
    updatedSelection[index].conforming = !updatedSelection[index].conforming;
    setRadioOptions(updatedSelection);
  };

  const handleOptionDelete = (index: number) => {
    if (radioOptions.length === 1) {
      return;
    }

    setRadioOptions((prevOptions) => prevOptions.filter((_, i) => i !== index));
  };

  return {
    radioOptions,
    setRadioOptions,
    handleAddOption,
    handleOptionChange,
    handleCheckboxChange,
    handleOptionDelete,
  };
};
