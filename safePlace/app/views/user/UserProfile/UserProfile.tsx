import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AddImageModal, Button, ErrorPage, FormLabel, Input, LoadingWrapper, Select, Typography } from "../../../components";
import { useUserProfile } from "./hooks/useUserProfile";
import {MediaImagePlus as MediaImagePlusIcon} from "iconoir-react-native";
import { theme } from "../../../constants/theme";
import { Controller } from "react-hook-form";
import { useUserData } from "./hooks/useUserData";
import { capitalizeFirstLetter } from "../../../utils";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { getHousingAreaTypesToSelect, getHousingTypesToSelect, getUserExpirienceTypesToSelect, getUserLifestyleTypesToSelect } from "../../../utils/getUserSelectData";
import { useAppSelector } from "../../../redux/hooks";
import { selectUserID } from "../../../redux/accountSlice";
import { Image } from 'expo-image'
import { AdditionalUserData } from "../../../types";

export const UserProfile = () => {
  const userID = useAppSelector(selectUserID);
  const {
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
  } = useUserProfile(userID);

  const expierienceTypes = getUserExpirienceTypesToSelect();
  const lifestyleTypes = getUserLifestyleTypesToSelect();
  const housingTypes = getHousingTypesToSelect();
  const areaTypes = getHousingAreaTypesToSelect();

  const {userProfileControl,
    handleUserProfileSubmit,
    userProfileErrors } = useUserData(userDetails);

  const handleUserProfileUpdate = () => {
      const newDetails = userProfileControl._formValues as AdditionalUserData;
      handleUserDetailsUpdate(newDetails);
  };


  if (error) {
    return (
      <ErrorPage
        text="Unable to load user data."
        action="Please reload."
        button={<Button text="Reload" onPress={loadUserDetails} />}
      />
    );
  }
  return (
    <LoadingWrapper isLoading={loading} text="Loading user data...">
      <View>
        <View style={styles.saveButton}>
             <Button
               text="Save"
            disabled={!isChanged}
            onPress={handleUserProfileSubmit(handleUserProfileUpdate)}
             />
        </View>
        <AddImageModal onPressFunction={getProfilePhoto} isVisible={profileModalVisible} setVisible={setProfileModalVisible} />
        <AddImageModal onPressFunction={getBackgroundPhoto} isVisible={backgroundModalVisible} setVisible={setBackgroundModalVisible} />
        <View
          style={styles.photoContainer}
        >
          <TouchableOpacity style={styles.backgroundContainer}
            onPress={() => { setBackgroundModalVisible(true); }}
          >
            
            {userDetails.backgroundPhoto == "" ?
              <MediaImagePlusIcon color={styles.iconColor.color} height={36} width={36} /> :
              <Image
                contentFit="fill"
                style={styles.backgroundImage}
                transition={1000}
                source={userDetails.backgroundPhoto}
                placeholder={"Background Image"}
              />

            }
          </TouchableOpacity>

          <TouchableOpacity style={styles.profileContainer}
            onPress={() => { setProfileModalVisible(true); }}
          >
            {userDetails.profilePhoto == "" ?
             <MediaImagePlusIcon color={styles.iconColor.color} height={36} width={36} />:
            <Image 
              contentFit="fill"
              style={styles.profileImage}
              transition={1000}
                source={userDetails.profilePhoto}
              placeholder={"Profile"}
            />

            }
            
          </TouchableOpacity >

        </View>
        <View style={styles.formContainer}>
          <FormLabel text={"Age"} errors={userProfileErrors.age} />
          <Controller
            control={userProfileControl}
            name="age"
            
            render={({ field: { onChange, value, name } }) => (
              <Input
                keyboardType="numeric"
                text={value?value.toString():""}
                onChange={(e)=>{
                  onChange(e);
                  setIsChanged(true)
                }}
                placeholder={capitalizeFirstLetter(name)}
                
              />
            )}
          />
          <FormLabel text={"Experience"} errors={userProfileErrors.experience} />
          <Controller
            control={userProfileControl}
            name="experience"
            render={({ field: { onChange, value, name } }) => (
              <Select
                selectData={expierienceTypes}
                value={value?value:""}
                onSelect={(e) => {
                  onChange(e);
                  setIsChanged(true);
                }}
                placeholder={name}
              />
            )}
          />
          <FormLabel text={"Lifestyle"} errors={userProfileErrors.lifestyle} />
          <Controller
            control={userProfileControl}
            name="lifestyle"
            render={({ field: { onChange, value, name } }) => (
              <Select
                selectData={lifestyleTypes}
                value={value ? value : ""}
                onSelect={(e) => {
                  onChange(e);
                  setIsChanged(true);
                }}
                placeholder={name}
              />
            )}
          />
          <FormLabel text={"Husing Area"} errors={userProfileErrors.area} />
          <Controller
            control={userProfileControl}
            name="area"
            render={({ field: { onChange, value, name } }) => (
              <Select
                selectData={areaTypes}
                value={value ? value : ""}
                onSelect={(e) => {
                  onChange(e);
                  setIsChanged(true);
                }}
                placeholder={name}
              />
            )}
          />
          <FormLabel text={"Housing"} errors={userProfileErrors.housing} />
          <Controller
            control={userProfileControl}
            name="housing"
            render={({ field: { onChange, value, name } }) => (
              <Select
                selectData={housingTypes}
                value={value}
                onSelect={(e) => {
                  onChange(e);
                  setIsChanged(true);
                }}
                placeholder={name}
              />
            )}
          />

        </View>
      </View>
    </LoadingWrapper>
    
  );
};

const styles = StyleSheet.create({
  photoContainer: {
    flex: 1,
    alignItems: "center",
  },
  formContainer:{
    flex: 1,
    top:100,
  },
  backgroundContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors["background-clickable"],
    maxHeight: 300,
    minHeight:150,
    width: "100%"
  },
  profileContainer: {
    position: "absolute",
    borderWidth: 2,
    borderBlockColor: "gray",
    top: 75,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors["background-clickable"],
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 150 / 2
  },
  backgroundImage: {
    maxHeight: 300,
    minHeight: 150,
    width: "100%"
  },
  iconColor: { color: theme.colors["action-selected"] },
  saveButton:{
    position:"absolute",
    top:200,
    right:0
  }

});

