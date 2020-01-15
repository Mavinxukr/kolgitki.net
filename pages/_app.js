import React from 'react';
import { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import createStore from '../redux/store';

const MyApp = ({ Component, pageProps, store }) => {
  return (
    <Container>
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </Container>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  return { pageProps };
};

export default withRedux(createStore)(MyApp);
