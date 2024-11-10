import { Keyboard, StatusBar, TouchableWithoutFeedback } from "react-native";
import { Navigation } from "./app/navigation";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";
import { PaperProvider } from "react-native-paper";

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar />
      <PaperProvider>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <Navigation />
        </TouchableWithoutFeedback>
      </PaperProvider>
    </Provider>
  );
};

export default App;
