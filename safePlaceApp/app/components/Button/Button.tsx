import { Pressable, Text, StyleSheet } from "react-native";

const Button = ({ text = "", disabled = false }) => {
  return (
    <Pressable
      disabled={disabled}
      style={[styles.container, disabled && styles.disabled]}
      onPress={() => {}}
    >
      <Text style={styles.text}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    padding: 10,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9EF01A",
  },
  text: {
    fontSize: 20,
  },
  disabled: {
    marginBottom: 10,
  },
});

export default Button;
