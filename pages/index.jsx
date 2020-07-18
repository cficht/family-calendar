import Head from 'next/head';
import Link from 'next/link';
import Nav from '../components/Nav';

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Family Calendar</title>
      </Head>

      <main>
        <Nav />
      </main>

      <footer>
      </footer>
    </div>
  );
}
