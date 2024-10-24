import { FC, useState } from "react";
import { AccountTypes } from "../../types";
import { StyleSheet, View } from "react-native";
import { theme } from "../../constants/theme";
import { getAccountTabs } from "../../utils";
import { Tab } from "../Tab";

type BottomNavigationProps = {
  type: AccountTypes;
};

export const BottomNavigation: FC<BottomNavigationProps> = ({ type }) => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const tabClick = (index: number) => {
    setActiveTab(index);
  };

  const tabs = getAccountTabs(type);

  return (
    <View style={styles.container}>
      {tabs.map((tab, i) => {
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
