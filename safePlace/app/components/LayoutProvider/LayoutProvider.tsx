import React, { FC, PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { BottomNavigation } from "../BottomNavigation";
import { AccountType } from "../../types";

type LayoutProviderProps = PropsWithChildren<{
  navbar?: JSX.Element;
  userType?: AccountType;
}>;

export const LayoutProvider: FC<LayoutProviderProps> = ({
  navbar,
  userType,
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
      {userType && <BottomNavigation type={userType} />}
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
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(5),
  },
});
