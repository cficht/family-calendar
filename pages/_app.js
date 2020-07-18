import '../styles/index.css';
import { Provider } from 'react-redux';
import store from '../store';

/* eslint-disable */
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
