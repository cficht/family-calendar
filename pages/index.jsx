import Head from 'next/head';
import Link from 'next/link';
import Splash from '../components/Splash';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Family Calendar</title>
      </Head>

      <main>
        <Splash />
      </main>

      <footer>
      </footer>
    </div>
  );
}
