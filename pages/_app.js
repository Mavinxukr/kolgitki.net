import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { DefaultSeo } from 'next-seo';
import createStore from '../redux/store';

const MyApp = ({ Component, pageProps, store }) => (
  <Provider store={store}>
    <DefaultSeo
      openGraph={{
        type: 'website',
        locale: 'ru-UA',
        url: 'https://dev.kolgotki.ml/',
        site_name: ' Kolgotki',
      }}
    />
    <Component {...pageProps} />
  </Provider>
);

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return { pageProps };
};

export default withRedux(createStore)(MyApp);
