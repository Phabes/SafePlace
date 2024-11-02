import { FC } from "react";
import { StyleSheet, View } from "react-native";
import { Input, Typography } from "../../../../../../../../components";
import { theme } from "../../../../../../../../constants/theme";

type QuestionProps = {
  questionText: string;
  setQuestionText: (text: string) => void;
};

export const Question: FC<QuestionProps> = ({
  questionText,
  setQuestionText,
}) => {
  return (
    <View style={styles.container}>
      <Typography text="Question:" />
      <Input text={questionText} onChange={setQuestionText} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { gap: theme.spacing(1) },
});
