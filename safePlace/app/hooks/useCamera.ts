import { PermissionsAndroid, Platform } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { PhotoRes } from "../types";


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
      return true;
    } else {
      console.log('Camera permission denied');
      return false;
    }
  } catch (err) {
    console.warn(err);
  }
};

const checkPermissions = async () => {
  if (Platform.OS == "android") {
    const cameraPermission = await PermissionsAndroid.check('android.permission.CAMERA');
    if (cameraPermission) {
      return true;
    } else {
      return await requestCameraPermissionAndroid();
    }
  }
};

export const useCamera = async ():Promise<PhotoRes> => {
  const getAccess = await checkPermissions()
  if (getAccess){
    let res = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1
    });
    if (!res.canceled) {
      return {hasPhoto:true,photo:res.assets[0]}
    }
  }
  return { hasPhoto: false, photo: "" }
};