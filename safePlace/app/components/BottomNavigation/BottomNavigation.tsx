import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { Tab } from "../Tab";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { selectActiveTab, setActiveTab } from "../../redux/appNavigationSlice";
import { getAccountTabs } from "../../utils/getAccountTabs";
import { AccountType } from "../../types";

type BottomNavigationProps = {
  type: AccountType;
};

export const BottomNavigation: FC<BottomNavigationProps> = ({ type }) => {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector(selectActiveTab);

  const accountTabs = getAccountTabs(type);

  const tabClick = (index: number) => {
    dispatch(setActiveTab(index));
  };

  return (
    <View style={styles.container}>
      {accountTabs.map((tab, i) => {
        const current = activeTab === i ? "active" : "default";

        return (
          <Tab
            key={`Bottom-Tab-${i}`}
            text={tab.text}
            onPress={() => tabClick(i)}
            variant={current}
            icon={tab.icon}
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
