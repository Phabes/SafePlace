import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../constants/theme";

type ListItemProps = {
  text: string;
  buttons: Array<{
    onPress: () => void;
    icon: IconDefinition;
  }>;
};

export const ListItem: FC<ListItemProps> = ({ text, buttons }) => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Typography text={text} />
      </View>
      <View style={styles.buttons}>
        {buttons.map((button, index) => {
          return (
            <TouchableOpacity
              key={`ICON-BUTTON-${index}`}
              onPress={button.onPress}
            >
              <Icon icon={button.icon} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors["background-subtle"],
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    gap: theme.spacing(1),
    elevation: 2,
  },
  text: { flex: 1 },
  buttons: {
    flexDirection: "row",
    gap: theme.spacing(2),
  },
});
