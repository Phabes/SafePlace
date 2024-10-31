import { View } from "react-native";
import { Tab, Typography } from "../../../components";
import { useState } from "react";
import { EditPetition } from "./views/EditPetition";
import { ListPetitions } from "./views/ListPetitions";

export const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"List" | "Edit">("Edit");

  return (
    <View style={{ flex: 1 }}>
      <Typography text="Choose:" />
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <Tab
          text="Petitions"
          onPress={() => setActiveTab("List")}
          variant={activeTab === "List" ? "active" : "default"}
        />
        <Tab
          text="Edit"
          onPress={() => setActiveTab("Edit")}
          variant={activeTab === "Edit" ? "active" : "default"}
        />
      </View>
      {activeTab === "List" && <ListPetitions />}
      {activeTab === "Edit" && <EditPetition />}
    </View>
  );
};
