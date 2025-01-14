import "../src/styles/global.css";
import { Provider } from "react-redux";
import store from "../src/store/index";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}
