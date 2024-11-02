import { View } from "react-native";
import { Input, Typography } from "../../../../../../../../components";
import { theme } from "../../../../../../../../constants/theme";
import { FC } from "react";

export const Question: FC<{
  questionText: string;
  setQuestionText: (text: string) => void;
}> = ({ questionText, setQuestionText }) => {
  return (
    <View style={{ gap: theme.spacing(1) }}>
      <Typography text="Question:" />
      <Input text={questionText} onChange={setQuestionText} />
    </View>
  );
};
