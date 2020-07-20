import Head from 'next/head';
import Link from 'next/link';
import Splash from '../components/Splash';
import { API, graphqlOperation } from "aws-amplify";
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import config from "../src/aws-exports";
import { nanoid } from 'nanoid';
import { useState } from 'react';
import { createFamily } from '../src/graphql/mutations';
API.configure(config);
// const MY_ID = nanoid();

function Home() {
  const [familyName, setFamilyName] = useState('');

  //REFACTOR
  const handleAddFamily = e => {
    e.preventDefault();
    API.graphql(
      graphqlOperation(createFamily, {
        input: {
          id: MY_ID,
          name: familyName
        }
      })
    )
  }



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
      </main>

      <footer>
        <AmplifySignOut />
      </footer>
    </div>
  );
}

export default withAuthenticator(Home);