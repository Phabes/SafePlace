import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography";
import { FieldError } from "react-hook-form";

type FormLabelInputs = {
  text: string;
  errors?: FieldError;
};

export const FormLabel: FC<FormLabelInputs> = ({ text, errors }) => {
  const styles = useStyle();

  return (
    <View style={styles.container}>
      <Typography text={text} variant="body-small" />
      {errors && errors.message && (
        <Typography
          text={errors.message}
          variant="body-small"
          color="text-error"
        />
      )}
    </View>
  );
};

const useStyle = () => {
  return StyleSheet.create({
    container: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  });
};
