import React, { FC, useState } from "react";
import Modal from "react-native-modal";
import { TouchableOpacity, View , StyleSheet} from "react-native";
import { theme } from "../../constants/theme";
import {  Camera as CameraIcon, MediaImageList as MediaImageListIcon } from "iconoir-react-native";
import { useCamera } from "../../hooks";
import { uploadImage } from "../../hooks/useStorage";
import { useGallery } from "../../hooks/useGallery";
import { ModalProps, AddImageModalRes } from "../../types";


export enum PhotoOrigin {
  LIBRARY = 1,
  CAMERA
}

export const AddImageModal: FC<ModalProps> = ({ onPressFunction, isVisible, setVisible })=>{
  const takePhoto = async (getFrom:PhotoOrigin): Promise<AddImageModalRes> => {
    const res = getFrom == PhotoOrigin.CAMERA ? await useCamera() : await useGallery();
    if (res.hasPhoto) {
      const uploadUrl = await uploadImage(res.photo.uri);
      return { uri: uploadUrl, isTaken: uploadUrl.length>0 };
    }
    return { uri: "", isTaken: false };
  }
  
  const onCameraPress = async (getFrom: PhotoOrigin) => {
    const res = await takePhoto(getFrom)
    onPressFunction(res)
    setVisible(false)
  }

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={() => setVisible(false)}
    >
      <View style={styles.container}>
        <View style={styles.verticalContainer}
        >
          <TouchableOpacity style={styles.innerContainer} onPress={()=>{onCameraPress(PhotoOrigin.CAMERA)}}>
            <CameraIcon color={theme.colors["action-selected"]} height={36} width={36} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.touchable}
            onPress={() => { onCameraPress(PhotoOrigin.LIBRARY)}}>
            <MediaImageListIcon color={theme.colors["action-selected"]} height={36} width={36} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },
  verticalContainer: { flex: 1, flexDirection: "row", direction: "ltr", width: "80%", maxHeight: "25%", backgroundColor: theme.colors["background-primary"] },
  innerContainer: { flex: 1, justifyContent: "center", alignItems: "center", borderRightColor: theme.colors["background-clickable"], borderRightWidth: 2 },
  touchable: { flex: 1, justifyContent: "center", alignItems: "center" }

});