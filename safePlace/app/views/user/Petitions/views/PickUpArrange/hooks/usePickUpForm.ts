import { useState } from "react";

export const usePickUpForm = () => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  return {
    date,
    setDate,
    showDatePicker,
    setShowDatePicker,
    showTimePicker,
    setShowTimePicker,
  };
};
