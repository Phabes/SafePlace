import React, { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../Typography";
import { theme } from "../../constants/theme";

type TabProps = {
  text: string;
  onPress: (...args: any) => any;
  variant?: "default" | "active";
};

export const Tab: FC<TabProps> = ({ text, onPress, variant = "default" }) => {
  const styles = useStyles(variant);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.tab}
        onPress={onPress}
        activeOpacity={0.5}
      >
        <Typography text={text} />
      </TouchableOpacity>
    </View>
  );
};

const useStyles = (variant: TabProps["variant"]) => {
  const borderColor = variant === "active" ? "text-success" : "text-secondary";

  return StyleSheet.create({
    container: { flex: 1 },
    tab: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.colors["background-primary"],
      margin: theme.spacing(2),
      paddingVertical: theme.spacing(2),
      borderWidth: theme.spacing(1),
      borderRadius: theme.spacing(2),
      borderColor: theme.colors[borderColor],
    },
  });
};
