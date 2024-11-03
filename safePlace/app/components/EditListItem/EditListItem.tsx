import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../constants/theme";

type EditListItemProps = {
  text: string;
  editClick: () => void;
  deleteClick: () => void;
};

export const EditListItem: FC<EditListItemProps> = ({
  text,
  editClick,
  deleteClick,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.text}>
        <Typography text={text} />
      </View>
      <View style={styles.buttons}>
        <TouchableOpacity onPress={editClick}>
          <Icon icon={faPenToSquare} />
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteClick}>
          <Icon icon={faTrash} />
        </TouchableOpacity>
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
