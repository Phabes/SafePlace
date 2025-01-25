import { FC } from "react";
import { View , StyleSheet} from "react-native";
import { string } from "yup";
import Modal from "react-native-modal";
import { ModalProps } from "../../types";
import { theme } from "../../constants/theme";


export interface FilteringPopUpProps extends ModalProps {
  UserID: string;
}
export const FilteringPopUp: FC<FilteringPopUpProps> = ({ UserID, onPressFunction, isVisible, setVisible }) =>{
  return(
     <Modal
          isVisible={isVisible}
          onBackdropPress={() => setVisible(false)}
        >
          <View style={styles.container}>
           
          </View>
        </Modal>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center" },

});
