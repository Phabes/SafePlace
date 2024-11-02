import React, { FC, useState } from "react";
import { ModalProps } from "react-native-modal";
import Modal from "react-native-modal";
import { TouchableOpacity, View } from "react-native";
import { theme } from "../../constants/theme";
import {  Camera as CameraIcon, MediaImageList as MediaImageListIcon } from "iconoir-react-native";
import { useCamera } from "../../hooks";
import { uploadImage } from "../../hooks/useStorage";
import { useGallery } from "../../hooks/useGallery";

export type AddImageModalRes = {
  uri:string;
  isTaken:boolean
}

export enum PhotoOrigin {
  LIBRARY = 1,
  CAMERA
}

export type AddImageModalProps ={
  onPressFunction:any;
  isVisible:boolean;
  setVisible:any;
}
export const AddImageModal: FC<AddImageModalProps> = ({ onPressFunction, isVisible, setVisible })=>{
  const takePhoto = async (getFrom:PhotoOrigin): Promise<AddImageModalRes> => {
    const res = getFrom == PhotoOrigin.CAMERA ? await useCamera() : await useGallery();
    console.log(res)
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ flex: 1, flexDirection: "row", direction: "ltr", width: "80%", maxHeight: "25%", backgroundColor: theme.colors["background-primary"] }}
        >
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center", borderRightColor: theme.colors["background-clickable"], borderRightWidth: 2 }
          } onPress={()=>{onCameraPress(PhotoOrigin.CAMERA)}}>
            <CameraIcon color={theme.colors["action-selected"]} height={36} width={36} />
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
            onPress={() => { onCameraPress(PhotoOrigin.LIBRARY)}}>
            <MediaImageListIcon color={theme.colors["action-selected"]} height={36} width={36} />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}