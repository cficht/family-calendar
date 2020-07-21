import '../styles/index.css';
import { Provider } from 'react-redux';
import store from '../store';
import Amplify, { Auth } from 'aws-amplify';
import awsconfig from '../src/aws-exports';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
Amplify.configure(awsconfig);

/* eslint-disable */
export default function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  )
}
