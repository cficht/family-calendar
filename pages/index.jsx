import Head from 'next/head';
import Link from 'next/link';
import { Auth, API, graphqlOperation } from 'aws-amplify';
import { useState, useEffect } from 'react';
import Splash from '../components/Splash';
import config from '../src/aws-exports';
import {
  signUp, confirmSignUp, signIn, signOut,
} from '../utils/auth';
// import { nanoid } from 'nanoid';
import { createFamily } from '../src/graphql/mutations';

API.configure(config);
// const MY_ID = nanoid();

export default function Home() {
  // const [familyName, setFamilyName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  // REFACTOR
  // const handleAddFamily = (e) => {
  //   e.preventDefault();
  //   API.graphql(
  //     graphqlOperation(createFamily, {
  //       input: {
  //         id: MY_ID,
  //         name: familyName,
  //       },
  //     }),
  //   );
  // };

  useEffect(() => {
    Auth.currentAuthenticatedUser()
      .then((user) => console.log(user))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="container">
      <Head>
        <title>Family Calendar</title>
      </Head>

      <main>
        <Splash />
        {/* <form onSubmit={handleAddFamily}>
          <input type="text" value={familyName} onChange={(e) => setFamilyName(e.target.value)}/>
          <button>Submit</button>
        </form> */}
        <form onSubmit={(e) => signUp(e, userName, password, email)}>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button>Sign Up</button>
        </form>
        <form onSubmit={(e) => confirmSignUp(e, userName, confirmation)}>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
          <input type="text" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} placeholder="Code" />
          <button>Confirm</button>
        </form>
        <form onSubmit={(e) => signIn(e, userName, password)}>
          <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" />
          <input type="text" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
          <button>Sign In</button>
        </form>
        <button onClick={(e) => signOut(e)}>Sign Out</button>
      </main>

      <footer />
    </div>
  );
}
