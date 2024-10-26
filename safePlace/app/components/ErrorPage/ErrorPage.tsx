import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Typography } from "../Typography";
import { LayoutProvider } from "../LayoutProvider";
import { theme } from "../../constants/theme";

type ErrorPageProps = {
  text: string;
  action: string;
  button?: JSX.Element;
};

export const ErrorPage: FC<ErrorPageProps> = ({ text, action, button }) => {
  return (
    <LayoutProvider>
      <View style={styles.container}>
        <Typography text={text} variant="header-large" center={true} />
        <Typography text={action} variant="header-large" center={true} />
        {button}
      </View>
    </LayoutProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: theme.spacing(3),
  },
});
