import { FC } from "react";
import { Dialog, Portal } from "react-native-paper";
import { Typography } from "../Typography";
import { Button } from "../Button";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";

export type DialogPopUpProps = {
  header: string;
  content: string;
  handleAccept: () => void;
  handleCancel: () => void;
};

export const DialogPopUp: FC<DialogPopUpProps> = ({
  header,
  content,
  handleAccept,
  handleCancel,
}) => {
  return (
    <Portal>
      <Dialog visible={true} onDismiss={handleCancel} style={styles.container}>
        <Dialog.Title>
          <Typography text={header} variant="header-small" />
        </Dialog.Title>
        <Dialog.Content>
          <Typography text={content} />
        </Dialog.Content>
        <Dialog.Actions>
          <View style={styles.buttons}>
            <Button onPress={handleAccept} text="OK" />
            <Button onPress={handleCancel} text="Cancel" variant="secondary" />
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors["background-subtle"],
    borderRadius: theme.spacing(4),
    padding: theme.spacing(1),
  },
  buttons: {
    flexDirection: "row",
    gap: theme.spacing(1),
  },
});
