import { TouchableOpacity, View, PermissionsAndroid, Platform } from "react-native";
import { LayoutProvider, Typography } from "../../components";
import { NavbarWithLogout } from "../../components/NavbarWithLogout";
import { theme } from "../../constants/theme";
import { Camera } from "iconoir-react-native";

export const UserProfileForm = () => {

  const addBackgroundPhoto = () => {
    alert("Background")
  }

  const addProfilePhoto = async () => {
    if(Platform.OS=="android"){
      const cameraPermission = await PermissionsAndroid.check('android.permission.CAMERA');
      if (cameraPermission){
        console.log("GOOD")
      }else{
        requestCameraPermissionAndroid()
      }
    }
    
  }

  const requestCameraPermissionAndroid = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {
          title: 'SafePlace Camera Permission',
          message:
            'SafePlace needs access to your camera ' +
            'so you can take awesome pictures.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the camera');
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  };
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
