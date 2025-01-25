import { useEffect, useState } from "react";
import { AddImageModalRes, AdditionalShelterData } from "../../../../types";
import { EMPTY_SHELTER_DETAILS } from "../../../../constants/emptyUserDetails";
import { getShelterData, saveShelterBackgroundImage, saveShelterProfileImage, updateShelterDetails } from "../../../../services/account/account";

export const useShelterProfile = (userID: string) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [backgroundModalVisible, setBackgroundModalVisible] = useState(false);
  const [shelterDetails, setShelterDetails] = useState<AdditionalShelterData>(EMPTY_SHELTER_DETAILS);
  const [isChanged, setIsChanged] = useState(false);

    useEffect(() => {
      loadShelterDetails();
    }, []);
    
  const loadShelterDetails = () => {
        setLoading(true);
        setError(false);
        (async () => {
          try {
            const shelterData = await getShelterData(userID);
            setShelterDetails(shelterData.data() ? shelterData.data().details : EMPTY_SHELTER_DETAILS);
          } catch (error) {
            setError(true);
          } finally {
            setLoading(false);
          }
        })();
  }

    const getBackgroundPhoto = (res: AddImageModalRes) => {
      if (res.isTaken) {
        saveShelterBackgroundImage(userID, res.uri, shelterDetails);
        setShelterDetails({ ...shelterDetails, backgroundPhoto: res.uri})
        setBackgroundModalVisible(false);
        
      }
    };
  
    const getProfilePhoto = (res: AddImageModalRes) => {
      if (res.isTaken) {
        saveShelterProfileImage(userID, res.uri, shelterDetails);
        setShelterDetails({ ...shelterDetails, profilePhoto: res.uri })
        setProfileModalVisible(false);
        
      } 
    }
  
  const handleShelterDetailsUpdate = (shelterDetails:AdditionalShelterData) => {
      updateShelterDetails(userID, shelterDetails)
      setIsChanged(false)
    }
    
    return {
      loading,
      error,
      profileModalVisible,
      backgroundModalVisible,
      shelterDetails,
      isChanged, 
      setIsChanged,
      loadShelterDetails,
      setProfileModalVisible,
      setBackgroundModalVisible,
      getBackgroundPhoto,
      getProfilePhoto,
      handleShelterDetailsUpdate
    }

}