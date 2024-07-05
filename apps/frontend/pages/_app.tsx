import { ApolloProvider } from '@apollo/client';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { client } from '../apollo/config';
import { Layout } from '../components/layout';
import './styles.css';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Pizzaria!</title>
      </Head>
      <main className="app bg-gray-50 h-screen vw-100">
        <ApolloProvider client={client}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ApolloProvider>
      </main>
    </>
  );
}

export default CustomApp;
