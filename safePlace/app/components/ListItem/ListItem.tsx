import { FC } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Typography } from "../Typography";
import { Icon } from "../Icon";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../../constants/theme";
import { Image } from 'expo-image';

type ListItemProps = {
  text: string;
  image?: string;
  buttons: Array<{
    onPress: () => void;
    icon: IconDefinition;
  }>;
};

export const ListItem: FC<ListItemProps> = ({ text, image, buttons }) => {
  console.log(text, image)
  return (
    <View style={styles.container}>
      {image != undefined && image != "" ?  
        <Image
          contentFit="contain"
          style={styles.backgroundImage}
          transition={1000}
          source={image}
          placeholder={"Animal Photo"}
        />:undefined}
      <View style={styles.footer}>
        <View style={styles.text}>
          <Typography text={text} />
        </View>
        <View style={styles.buttons}>
          {buttons.map((button, index) => {
            return (
              <TouchableOpacity
                key={`ICON-BUTTON-${index}`}
                onPress={button.onPress}
              >
                <Icon icon={button.icon} />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container:{
    backgroundColor: theme.colors["background-subtle"], 
    borderRadius: theme.spacing(2),
  },
  footer: {
    backgroundColor: theme.colors["background-subtle"], 
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: theme.spacing(4),
    borderRadius: theme.spacing(2),
    gap: theme.spacing(1),
    elevation: 2,
  },
  text: { flex: 1 },
  buttons: {
    flexDirection: "row",
    gap: theme.spacing(2),
  },
  backgroundImage: {
    maxHeight: 300,
    minHeight: 150,
    width: "100%"
  },
});
