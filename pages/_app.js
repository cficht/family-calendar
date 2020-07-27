import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import store from '../store';
import awsconfig from '../src/aws-exports';
import '../styles/index.css';
import 'react-toastify/dist/ReactToastify.css';

Amplify.configure(awsconfig);

/* eslint-disable */
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
