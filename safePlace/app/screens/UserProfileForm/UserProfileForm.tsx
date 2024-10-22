import { TouchableOpacity, View, PermissionsAndroid, Platform } from "react-native";
import { LayoutProvider, Typography } from "../../components";
import { NavbarWithLogout } from "../../components/NavbarWithLogout";
import { theme } from "../../constants/theme";
import { MediaImagePlus as MediaImagePlusIcon,Camera as CameraIcon, MediaImageList as MediaImageListIcon} from "iconoir-react-native";
import Modal from "react-native-modal";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';


export const UserProfileForm = () => {
  const [isModalVisible, setModalVisible] = useState(true);

  const addBackgroundPhoto = () => {
    alert("Background")
  }
  const turnOnCamera = async () =>{
    let res = await ImagePicker.launchCameraAsync({
      allowsEditing:true,
      quality:1
    })
    if(!res.canceled){
      console.log(res)
    }
  }

  const openGallery = async () =>{
    let res = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1
    });
    if (!res.canceled) {
      console.log(res);
    }
  }

  const addProfilePhoto = async () => {
    if(Platform.OS=="android"){
      const cameraPermission = await PermissionsAndroid.check('android.permission.CAMERA');
      if (cameraPermission){
        console.log("GOOD")
        setModalVisible(true)
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
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={{ flex: 1, justifyContent:"center",alignItems:"center" }}>
          <View style={{flex:1,flexDirection:"row",direction:"ltr",width:"80%",maxHeight:"25%", backgroundColor:theme.colors["background-primary"]}}
          >
            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center",borderRightColor:theme.colors["background-clickable"],borderRightWidth:2 }
          } onPress={turnOnCamera}>
              <CameraIcon color={theme.colors["action-selected"]} height={36} width={36} />
            </TouchableOpacity>
            <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
              <MediaImageListIcon color={theme.colors["action-selected"]} height={36} width={36} />
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
          <MediaImagePlusIcon color={theme.colors["action-selected"]} height={36} width={36} />
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
          <MediaImagePlusIcon color={theme.colors["action-selected"]} height={36} width={36} />
        </TouchableOpacity >
        
      </View>
    </LayoutProvider>
  );
};
