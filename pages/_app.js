import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { DefaultSeo } from 'next-seo';
import createStore from '../redux/store';
import '../components/Layout/Global/Global.scss';
import styles from '../components/Layout/Global/GlobalModule.scss';


const MyApp = ({ Component, pageProps, store }) => {
  return (
    <Provider store={store}>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'ru-UA',
          url: 'https://synckolgot.mavinx.com/',
          site_name: 'Kolgotki'
        }}
      />

      <Component {...pageProps} />
    </Provider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return { pageProps };
};

export default withRedux(createStore)(MyApp);
