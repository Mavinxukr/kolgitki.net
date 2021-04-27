import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { DefaultSeo } from 'next-seo';
import createStore from '../redux/store';

import { useStocks } from '../hooks/stocks.hooks';
import { useGift } from '../hooks/gift.hook';
import { useBrands } from '../hooks/brands.hook';
import { StocksContext } from '../context/StocksContext';
import { GiftContext } from '../context/GiftContext';
import { BrandsContext } from '../context/BrandsContext';

const MyApp = ({ Component, pageProps, store }) => {
  const {
    brandsFilters,
    addBrandsFilter,
    clearBrandsFilters,
    removeBrandsFilter,
    setBrandsSorting,
    setBrandsPage
  } = useBrands();
  const {
    filters,
    addFilter,
    removeFilter,
    setSorting,
    clearFilters
  } = useStocks();
  const {
    giftFilters,
    addGiftFilter,
    clearGiftFilters,
    removeGiftFilter,
    setGiftSorting
  } = useGift();

  return (
    <BrandsContext.Provider
      value={{
        brandsFilters,
        addBrandsFilter,
        clearBrandsFilters,
        removeBrandsFilter,
        setBrandsSorting,
        setBrandsPage
      }}
    >
      <StocksContext.Provider
        value={{
          filters,
          addFilter,
          removeFilter,
          setSorting,
          clearFilters
        }}
      >
        <GiftContext.Provider
          value={{
            giftFilters,
            addGiftFilter,
            clearGiftFilters,
            removeGiftFilter,
            setGiftSorting
          }}
        >
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
    </BrandsContext.Provider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return { pageProps };
};

export default withRedux(createStore)(MyApp);
