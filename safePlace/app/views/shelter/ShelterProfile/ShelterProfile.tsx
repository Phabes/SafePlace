import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AddImageModal, Button, ErrorPage, FormLabel, Input, LoadingWrapper, Typography } from "../../../components";
import { MediaImagePlus as MediaImagePlusIcon } from "iconoir-react-native";
import { Image } from 'expo-image'
import { theme } from "../../../constants/theme";
import { selectUserID } from "../../../redux/accountSlice";
import { useAppSelector } from "../../../redux/hooks";
import { useShelterProfile } from "./hooks/useShelterProfile";
import { AdditionalShelterData } from "../../../types";
import { useShelterData } from "./hooks/useShelterData";
import { Controller } from "react-hook-form";
import { capitalizeFirstLetter } from "../../../utils";


export const ShelterProfile = () => {
  const userID = useAppSelector(selectUserID);
  const {
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
  } = useShelterProfile(userID);

  const{shelterProfileControl,
    handleShelterProfileSubmit,
    shelterProfileErrors } = useShelterData(shelterDetails);

    const handleShelterProfileUpdate = () => {
      const newDetails = shelterProfileControl._formValues as AdditionalShelterData;
      handleShelterDetailsUpdate(newDetails);
    };

   if (error) {
      return (
        <ErrorPage
          text="Unable to load shelter data."
          action="Please reload."
          button={<Button text="Reload" onPress={loadShelterDetails} />}
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
              onPress={handleShelterProfileSubmit(handleShelterProfileUpdate)}
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

              {shelterDetails.backgroundPhoto == "" ?
                <MediaImagePlusIcon color={styles.iconColor.color} height={36} width={36} /> :
                <Image
                  contentFit="cover"
                  style={styles.backgroundImage}
                  transition={1000}
                  source={shelterDetails.backgroundPhoto}
                  placeholder={"Background Image"}
                />

              }
            </TouchableOpacity>

            <TouchableOpacity style={styles.profileContainer}
              onPress={() => { setProfileModalVisible(true); }}
            >
              {shelterDetails.profilePhoto == "" ?
                <MediaImagePlusIcon color={styles.iconColor.color} height={36} width={36} /> :
                <Image
                  contentFit="cover"
                  style={styles.profileImage}
                  transition={1000}
                  source={shelterDetails.profilePhoto}
                  placeholder={"Profile"}
                />

              }
            </TouchableOpacity >
          </View>
          <View style={styles.formContainer}>
            <FormLabel text={"Contact Email"} errors={shelterProfileErrors.contactEmail} />
            <Controller
              control={shelterProfileControl}
              name="contactEmail"
              render={({ field: { onChange, value, name } }) => (
                <Input
                  text={value ? value.toString() : ""}
                  onChange={(e) => {
                    onChange(e);
                    setIsChanged(true);
                  }}
                  placeholder={"Contact Email"}

                />
              )}
            />

            <FormLabel text={"Phone number"} errors={shelterProfileErrors.phoneNumber} />
            <Controller
              control={shelterProfileControl}
              name="phoneNumber"
              render={({ field: { onChange, value, name } }) => (
                <Input
                  text={value ? value.toString() : ""}
                  onChange={(e) => {
                    onChange(e);
                    setIsChanged(true);
                  }}
                  placeholder={"Phone number"}

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

