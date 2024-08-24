import Board from "@/components/Board";
import store from "@/redux/store";
import { Provider } from "react-redux";

export default function Home() {
  return (
    <Provider store={store}>
        <Board />
    </Provider>
  );
}
