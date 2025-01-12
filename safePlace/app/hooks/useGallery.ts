import * as ImagePicker from 'expo-image-picker';
import { PhotoRes } from '../types';



export const useGallery = async (): Promise<PhotoRes> => {
  let result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing: true,
    quality: 1,
  });
  if(!result.canceled){
    return { hasPhoto: true, photo: result.assets[0] }
  }
  return { hasPhoto: false, photo: "" };
};