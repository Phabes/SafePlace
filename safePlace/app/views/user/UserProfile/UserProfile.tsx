import { StyleSheet, TouchableOpacity, View } from "react-native";
import { AddImageModal, FormLabel, Input, Select, Typography } from "../../../components";
import { useUserProfile } from "./hooks/useUserProfile";
import {MediaImagePlus as MediaImagePlusIcon} from "iconoir-react-native";
import { theme } from "../../../constants/theme";
import { Controller } from "react-hook-form";
import { useUserData } from "./hooks/useUserData";
import { capitalizeFirstLetter } from "../../../utils";
import { red100 } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { getHousingAreaTypesToSelect, getHousingTypesToSelect, getUserExpirienceTypesToSelect, getUserLifestyleTypesToSelect } from "../../../utils/getUserSelectData";

export const UserProfile = () => {
  const {
    profileModalVisible,
    backgroundModalVisible,
    setProfileModalVisible,
    setBackgroundModalVisible,
    getBackgroundPhoto,
    getProfilePhoto
  } = useUserProfile();

  const expierienceTypes = getUserExpirienceTypesToSelect();
  const lifestyleTypes = getUserLifestyleTypesToSelect();
  const housingTypes = getHousingTypesToSelect();
  const areaTypes = getHousingAreaTypesToSelect();

  const {userProfileControl,
    handleUserProfileSubmit,
    userProfileErrors} = useUserData();

  return (
    <View>
      <Typography text="User Profile" />
      <AddImageModal onPressFunction={getProfilePhoto} isVisible={profileModalVisible} setVisible={setProfileModalVisible} />
      <AddImageModal onPressFunction={getBackgroundPhoto} isVisible={backgroundModalVisible} setVisible={setBackgroundModalVisible} />
      <View
        style={styles.photoContainer}
      >
        <TouchableOpacity style={styles.backgroundImage}
          onPress={() => { setBackgroundModalVisible(true); }}
        >
          <MediaImagePlusIcon color={styles.iconColor.color} height={36} width={36} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.profileImage}
          onPress={() => { setProfileModalVisible(true); }}
        >
          <MediaImagePlusIcon color={styles.iconColor.color} height={36} width={36} />
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
               onChange={onChange}
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
              onSelect={onChange}
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
              onSelect={onChange}
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
              onSelect={onChange}
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
              value={value ? value : ""}
              onSelect={onChange}
              placeholder={name}
            />
          )}
        />

      </View>
    </View>
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
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: theme.colors["background-clickable"],
    maxHeight: 300,
    minHeight:150,
    width: "100%"
  },
  profileImage: {
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
  iconColor: { color: theme.colors["action-selected"] }

});

