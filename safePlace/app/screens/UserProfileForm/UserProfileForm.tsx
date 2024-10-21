import { TouchableOpacity, View } from "react-native";
import { LayoutProvider, Typography } from "../../components";
import { NavbarWithLogout } from "../../components/NavbarWithLogout";
import { theme } from "../../constants/theme";
import { Camera } from "iconoir-react-native";

export const UserProfileForm = () => {

  const addBackgroundPhoto = () => {
    alert("Background")
  }

  const addProfilePhoto = () => {
    alert("Profile");
  }
  return (
    <LayoutProvider navbar={<NavbarWithLogout text="Edit Profile" />}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors["background-clickable"],
          maxHeight:200,
          width:"100%"
        }}
          onPress={addBackgroundPhoto}
          >
          <Camera color={theme.colors["action-selected"]} height={36} width={36} />
        </TouchableOpacity>

        <TouchableOpacity style={{
          position:"absolute",
          borderWidth:2,
          borderBlockColor:"gray",
          top:125,
          left:0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors["background-clickable"],
          width: 150,
          height: 150,
          borderRadius: 150 / 2
        }}
          onPress={addProfilePhoto}
        >
          <Camera color={theme.colors["action-selected"]} height={36} width={36} />
        </TouchableOpacity >
        
      </View>
    </LayoutProvider>
  );
};
