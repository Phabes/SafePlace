import { FC } from "react";
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
import { formatDate, getTimeInMinutes } from "../../../../../utils";

type PickUpArrangeProps = {
  petition: SignedPetitionsUserFormat;
  close: () => void;
};

export const PickUpArrange: FC<PickUpArrangeProps> = ({ petition, close }) => {
  const {
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
  } = usePickUpData(petition.filledPetitionID, petition.status, close);

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
        <View style={styles.selectedDate}>
          <Typography text="Current pick up date:" variant="header-medium" />
          <Typography
            text={formatDate(date)}
            variant="header-medium"
            center
            color={color}
          />
        </View>

        <View style={styles.buttons}>
          <View style={styles.selectTimeButtons}>
            <Button
              text="Select Date"
              onPress={() => setShowDatePicker(true)}
              hasFullWidth
            />
            <Button
              text="Select Time"
              onPress={() => setShowTimePicker(true)}
              hasFullWidth
            />
          </View>
          <Button text="Arrange pick up" onPress={schedulePickUp} />
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
  selectedDate: { gap: theme.spacing(1) },
  buttons: { gap: theme.spacing(2) },
  selectTimeButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: theme.spacing(2),
  },
});
