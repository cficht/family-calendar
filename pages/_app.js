import '../styles/index.css';
import { Provider } from 'react-redux';
import Amplify from 'aws-amplify';
import store from '../store';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

/* eslint-disable */
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
