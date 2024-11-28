import { StyleSheet, View } from "react-native";
import { Tab, Typography } from "../../../components";
import { useState } from "react";
import { DashboardTab } from "./types";
import { DASHBOARD_TABS } from "./constants/dashboardTabs";
import { getDashboardSubview } from "./utils";
import { theme } from "../../../constants/theme";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("List");

  const CurrentDashboardSubview = getDashboardSubview(activeTab);

  return (
    <View style={styles.container}>
      <View>
        <Typography text="Choose:" />
        <View style={styles.tabs}>
          {DASHBOARD_TABS.map((tab) => {
            const isActive = activeTab === tab.id ? "active" : "default";

            return (
              <Tab
                key={`DASHBOARD-${tab.id}`}
                text={tab.label}
                onPress={() => setActiveTab(tab.id)}
                variant={isActive}
              />
            );
          })}
        </View>
      </View>
      <CurrentDashboardSubview />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, gap: theme.spacing(2) },
  tabs: {
    flexDirection: "row",
  },
});
