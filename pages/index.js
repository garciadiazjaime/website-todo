import Head from "next/head";
import Todos from '../components/todos'

export default function Home() {
  return (
    <div>
      <Head>
        <title>Grocery List</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Todos />
      </main>

      <style jsx>{`
        main {
          padding: 12px;
        }
      `}</style>

      <style jsx global>{`
        html,
        body {
          padding: 0;
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto,
            Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
