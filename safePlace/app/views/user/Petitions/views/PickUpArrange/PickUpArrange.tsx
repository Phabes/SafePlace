import { FC, useState } from "react";
import { SignedPetitionsUserFormat } from "../../../../../types";
import {
  Button,
  ErrorPage,
  LoadingWrapper,
  Typography,
} from "../../../../../components";
import { StyleSheet, View } from "react-native";
import { theme } from "../../../../../constants/theme";
import { usePickUpData } from "./hooks";
import DateTimePicker, {
  DateTimePickerEvent,
} from "@react-native-community/datetimepicker";
import { DAY_OF_THE_WEEK } from "../../../../../constants/dayOfTheWeek";
import { getTimeInMinutes } from "../../../../../utils";

type PickUpArrangeProps = {
  petition: SignedPetitionsUserFormat;
  close: () => void;
};

export const PickUpArrange: FC<PickUpArrangeProps> = ({ petition, close }) => {
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const {
    loading,
    error,
    loadingMessage,
    errorMessage,
    petitionCoreData,
    loadPickUpData,
  } = usePickUpData(petition.filledPetitionID, close);

  const color =
    getTimeInMinutes(date) >= getTimeInMinutes(new Date())
      ? "text-primary"
      : "text-error";

  const handleDateChange = (event: DateTimePickerEvent, date?: Date) => {
    // const {
    //   type,
    //   nativeEvent: { timestamp, utcOffset },
    // } = event;
    // console.log(event, date);
    if (!date) {
      return;
    }

    setDate((prevDate) => {
      const x = new Date(prevDate);
      x.setFullYear(date.getFullYear(), date.getMonth(), date.getDate());
      return x;
    });
    setShowDatePicker(false);
  };

  const handleTimeChange = (event: DateTimePickerEvent, date?: Date) => {
    if (!date) {
      return;
    }

    setDate((prevDate) => {
      const x = new Date(prevDate);
      x.setHours(date.getHours(), date.getMinutes(), 0, 0);
      return x;
    });
    setShowTimePicker(false);
  };

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const dayOfWeek = DAY_OF_THE_WEEK[date.getDay()];

    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${day}/${month}/${year} ${hours}:${minutes} (${dayOfWeek})`;
  };

  if (error) {
    return (
      <ErrorPage
        text={errorMessage}
        action="Please reload."
        button={<Button text="Reload" onPress={loadPickUpData} />}
      />
    );
  }

  return (
    <LoadingWrapper isLoading={loading} text={loadingMessage}>
      <View style={styles.container}>
        <Typography text={`User: ${petitionCoreData?.userName}`} />
        <Typography text={`Shelter: ${petitionCoreData?.shelterName}`} />
        <Typography text={`Animal: ${petitionCoreData?.animalName}`} />
        <View style={{ gap: theme.spacing(1) }}>
          <Typography text="Current pick up date:" />
          <Typography text={formatDate(date)} center color={color} />
        </View>

        <View style={styles.buttons}>
          <Button text="Select Date" onPress={() => setShowDatePicker(true)} />
          <Button text="Select Time" onPress={() => setShowTimePicker(true)} />
          <Button text="Back" onPress={close} variant="secondary" />
        </View>
      </View>

      {showDatePicker && (
        <DateTimePicker value={date} mode="date" onChange={handleDateChange} />
      )}

      {showTimePicker && (
        <DateTimePicker value={date} mode="time" onChange={handleTimeChange} />
      )}
    </LoadingWrapper>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(2) },
  buttons: { gap: theme.spacing(2) },
});
