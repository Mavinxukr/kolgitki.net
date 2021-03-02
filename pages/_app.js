import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { DefaultSeo } from 'next-seo';
import createStore from '../redux/store';
import { StocksContext } from '../context/StocksContext';
import { useStocks } from '../hooks/stocks.hooks';
import { useGift } from '../hooks/gift.hook';

import { GiftContext } from '../context/GiftContext';

const MyApp = ({ Component, pageProps, store }) => {
  const {
    filters,
    addFilter,
    removeFilter,
    setSorting,
    clearFilters
  } = useStocks();
  const { giftFilters, addGiftFilter } = useGift();

  return (
    <StocksContext.Provider
      value={{
        filters,
        addFilter,
        removeFilter,
        setSorting,
        clearFilters
      }}
    >
      <GiftContext.Provider value={{ giftFilters, addGiftFilter }}>
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
      </GiftContext.Provider>
    </StocksContext.Provider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return { pageProps };
};

export default withRedux(createStore)(MyApp);
