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
      <View style={{ flex: 1 }}>
        <Typography text={text} variant="body-small" />
      </View>
      <View>
        {errors && errors.message && (
          <Typography
            text={errors.message}
            variant="body-small"
            color="text-error"
          />
        )}
      </View>
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
