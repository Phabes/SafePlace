import React, { FC, PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";

type LayoutProviderProps = PropsWithChildren<{
  navbar?: JSX.Element;
}>;

export const LayoutProvider: FC<LayoutProviderProps> = ({
  navbar,
  children,
}) => {
  return (
    <View style={styles.container}>
      {navbar}
      <ScrollView
        contentContainerStyle={styles.scrollView}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.content}>{children}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: { flexGrow: 1 },
  content: {
    flex: 1,
    gap: theme.spacing(5),
    paddingHorizontal: theme.spacing(5),
    paddingBottom: theme.spacing(5),
  },
});
