import { useEffect, useState } from "react";
import { AddImageModalRes, AdditionalUserData } from "../../../../types";
import { getUserData } from "../../../../services";
import { EMPTY_USER_DETAILS } from "../../../../constants/userProfilTypes";
import { saveUserBackgroundImage, saveUserProfileImage, updateUserDetails } from "../../../../services/account/account";

export const useUserProfile = (userID: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [backgroundModalVisible, setBackgroundModalVisible] = useState(false);
  const [userDetails, setUserDetails] = useState<AdditionalUserData>(EMPTY_USER_DETAILS)
  const [isChanged, setIsChanged]  = useState(false);
  

    useEffect(() => {
      loadUserDetails();
    }, []);
    
  const loadUserDetails = () => {

        setLoading(true);
        setError(false);
        (async () => {
          try {
            const userData = await getUserData(userID);
            setUserDetails(userData.data() ? userData.data().details : EMPTY_USER_DETAILS);
          } catch (error) {
            setError(true);
          } finally {
            setLoading(false);
          }
        })();
  }
  const getBackgroundPhoto = (res: AddImageModalRes) => {
    if (res.isTaken) {
      saveUserBackgroundImage(userID, res.uri, userDetails);
      setUserDetails({ ...userDetails, backgroundPhoto: res.uri})
      setBackgroundModalVisible(false);
      
    } else
      console.log("Bad B" + res.uri);
  };

  const getProfilePhoto = (res: AddImageModalRes) => {
    if (res.isTaken) {
      saveUserProfileImage(userID, res.uri, userDetails);
      setUserDetails({ ...userDetails, profilePhoto: res.uri })
      setProfileModalVisible(false);
      
    } else
      console.log("Bad " + res.uri);
  }

  const handleUserDetailsUpdate = (userDetails:AdditionalUserData) => {
    updateUserDetails(userID,userDetails)
    setIsChanged(false)
  }
  
  return {
    loading,
    error,
    profileModalVisible,
    backgroundModalVisible,
    userDetails,
    isChanged, 
    setIsChanged,
    loadUserDetails,
    setProfileModalVisible,
    setBackgroundModalVisible,
    getBackgroundPhoto,
    getProfilePhoto,
    handleUserDetailsUpdate
  }
}