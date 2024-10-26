import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography";
import { theme, TypographyKeys } from "../../constants/theme";
import { STATUS_BAR_HEIGHT } from "../../constants/statusBarHeight";

export type NavbarProps = {
  text: string;
  variant?: TypographyKeys;
  button?: JSX.Element;
};

export const Navbar: FC<NavbarProps> = ({
  text,
  variant = "header-medium",
  button,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftSide}>
        <Typography variant={variant} text={text} numberOfLines={1} />
      </View>
      {button}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: theme.spacing(15),
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: theme.spacing(7),
    flexDirection: "row",
    backgroundColor: theme.colors["background-subtle"],
    elevation: 2,
    zIndex: 1,
    marginTop: STATUS_BAR_HEIGHT,
  },
  leftSide: {
    flexDirection: "row",
    gap: theme.spacing(4),
  },
});
