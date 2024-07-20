import { ApolloProvider } from '@apollo/client';
import { client } from '../apollo/config';

import { AppProps } from 'next/app';
import Head from 'next/head';

import { Layout } from '../components/layout';
import './styles.css';

import { PizzaContextProvider } from '../context/PizzaContext';

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Welcome to Pizzaria!</title>
      </Head>
      <main className="app bg-gray-50 h-screen vw-100">
        <PizzaContextProvider>
          <ApolloProvider client={client}>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ApolloProvider>
        </PizzaContextProvider>
      </main>
    </>
  );
}

export default CustomApp;
