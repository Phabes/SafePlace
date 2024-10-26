import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { AccountTypes } from "../../types";
import { theme } from "../../constants/theme";
import { Tab } from "../Tab";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectActiveTab, setActiveTab } from "../../redux/appNavigationSlice";
import { getAccountTabs } from "../../utils/getAccountTabs";

type BottomNavigationProps = {
  type: AccountTypes;
};

export const BottomNavigation: FC<BottomNavigationProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  const tabClick = (index: number) => {
    dispatch(setActiveTab(index));
  };

  const accountTabs = getAccountTabs(type);

  return (
    <View style={styles.container}>
      {accountTabs.map((tab, i) => {
        const current = activeTab === i ? "active" : "default";

        return (
          <Tab
            key={`Tab-${i}`}
            text={tab.text}
            onPress={() => tabClick(i)}
            variant={current}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: theme.spacing(20),
    backgroundColor: theme.colors["background-subtle"],
    elevation: 2,
  },
});
