import { Navigation } from "./app/navigation";
import { Provider } from "react-redux";
import { store } from "./app/redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
};

export default App;
