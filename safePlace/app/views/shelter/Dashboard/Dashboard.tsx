import { StyleSheet, View } from "react-native";
import { Tab, Typography } from "../../../components";
import { useState } from "react";
import { DashboardTab } from "./types";
import { DASHBOARD_TABS } from "./constants/dashboardTabs";
import { getDashboardSubview } from "./utils";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<DashboardTab>("List");

  const CurrentDashboardSubview = getDashboardSubview(activeTab);

  return (
    <View style={styles.container}>
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
      <CurrentDashboardSubview />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  tabs: {
    flexDirection: "row",
  },
});
