import { TouchableOpacity, View, PermissionsAndroid, Platform } from "react-native";
import { FormLabel, Input, LayoutProvider, Typography } from "../../components";
import { NavbarWithLogout } from "../../components/NavbarWithLogout";
import { theme } from "../../constants/theme";
import { MediaImagePlus as MediaImagePlusIcon,Camera as CameraIcon, MediaImageList as MediaImageListIcon} from "iconoir-react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { AddImageModal } from "../../components/AddImageModal";
import { AddImageModalRes } from "../../components/AddImageModal/AddImageModal";
import { Controller, FieldError } from "react-hook-form";
import { useUserDetails } from "./hooks/useUserDetails";
import { AdditionalUserData } from "../../constants/userAccount";



export const UserProfileForm = () => {
  const [isProfileModalVisible, setProfileModalVisible] = useState(false);
  const [isBackgroundModalVisible, setBackgroundModalVisible] = useState(false);
  const [signInError, setSignInError] = useState<FieldError | null>(null);

  const {
    detailsControl,
    handleDetailsSubmit,
    detailsErrors,
    clearDetailsErrors,
    detailsReset,
  } = useUserDetails();

  const getBackgroundPhoto = (res: AddImageModalRes) => {
    if (res.isTaken) {
      console.log("Good B" + res.uri);
    } else
      console.log("Bad B" + res.uri);
  }
 



  const getProfilePhoto = (res: AddImageModalRes) =>{
    if(res.isTaken){ 
      console.log("Good "+res.uri)
    }else
    console.log("Bad "+res.uri)
  }

  const inputChange = (
    value: string,
    onChange: (...event: any[]) => void,
    toClear: keyof AdditionalUserData
  ) => {
    setSignInError(null);
    clearDetailsErrors(toClear);
    onChange(value);
  };


  
  return (
    <LayoutProvider navbar={<NavbarWithLogout text="Edit Profile" />}>
      <AddImageModal onPressFunction={getProfilePhoto} isVisible={isProfileModalVisible} setVisible={setProfileModalVisible}/>
      <AddImageModal onPressFunction={getBackgroundPhoto} isVisible={isBackgroundModalVisible} setVisible={setBackgroundModalVisible} />
      <View
        style={{
          flex: 1,
          alignItems: "center",
        }}
      >
        <TouchableOpacity style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors["background-clickable"],
          maxHeight:200,
          width:"100%"
        }}
          onPress={()=>{setBackgroundModalVisible(true)}}
          >
          <MediaImagePlusIcon color={theme.colors["action-selected"]} height={36} width={36} />
        </TouchableOpacity>

        <TouchableOpacity style={{
          position:"absolute",
          borderWidth:2,
          borderBlockColor:"gray",
          top:125,
          left:0,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: theme.colors["background-clickable"],
          width: 150,
          height: 150,
          borderRadius: 150 / 2
        }}
          onPress={()=>{setProfileModalVisible(true)}}
        >
          <MediaImagePlusIcon color={theme.colors["action-selected"]} height={36} width={36} />
        </TouchableOpacity >
       
      </View>
      <FormLabel text={"Age"} />
      <Controller
        control={detailsControl}
        name="age"
        render={({ field: { onChange, value, name } }) => (
          <Input
            text={value ? value.toString() : ""}
            keyboardType="numeric"
            placeholder="Age"
            autoCapitalize="none"
            variant="default"
            onChange={(e) => inputChange(e, onChange, name)}
          />
        )}
      />
      <FormLabel text={"Experience with animals"} />
      <Controller
        control={detailsControl}
        name="experience"
        render={({ field: { onChange, value, name } }) => (
          <Input
            text={value ? value.toString() : ""}
            keyboardType="default"
            placeholder="Experience with animals"
            autoCapitalize="none"
            variant="default"
            onChange={(e) => inputChange(e, onChange, name)}
          />
        )}
      />
    </LayoutProvider>
  );
};
