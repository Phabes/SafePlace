import { useState } from "react";
import { AddImageModalRes } from "../../../../types";

export const useUserProfile = () => {
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [backgroundModalVisible, setBackgroundModalVisible] = useState(false);
  
  const getBackgroundPhoto = (res: AddImageModalRes) => {
    if (res.isTaken) {
      console.log("Good B" + res.uri);
    } else
      console.log("Bad B" + res.uri);
  };




  const getProfilePhoto = (res: AddImageModalRes) => {
    if (res.isTaken) {
      console.log("Good " + res.uri);
    } else
      console.log("Bad " + res.uri);
  }
  return {
    profileModalVisible,
    backgroundModalVisible,
    setProfileModalVisible,
    setBackgroundModalVisible,
    getBackgroundPhoto,
    getProfilePhoto
  }
}