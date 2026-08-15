import '../src/styles/global.css';
import { Provider } from 'react-redux';
import store from '../src/store/index';
import GreetingDialog from '../src/components/GreetingDialog';

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
      <GreetingDialog />
    </Provider>
  );
}
