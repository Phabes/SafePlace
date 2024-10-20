import { FC } from "react";
import { ColorKeys, theme } from "../../constants/theme";
import { ActivityIndicator, StyleSheet, View } from "react-native";
import { Typography } from "../Typography";

export type LoadingProps = {
  size?: "small" | "large";
  color?: ColorKeys;
  text?: string;
};

export const Loading: FC<LoadingProps> = ({
  size = "large",
  color = "text-success",
  text,
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator
        size={size}
        color={theme.colors[color]}
        style={styles.scale}
      />
      {text && <Typography variant="header-small" text={text} center />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(5),
  },
  scale: { transform: [{ scaleX: 2 }, { scaleY: 2 }] },
});
