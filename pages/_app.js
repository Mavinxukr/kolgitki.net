import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import { DefaultSeo } from 'next-seo';
import createStore from '../redux/store';
import { StocksContext } from '../context/StocksContext';
import { useStocks } from '../hooks/stocks.hooks';
import { useGift } from '../hooks/gift.hook';
import { useProducts } from '../hooks/products.hook';

import { GiftContext } from '../context/GiftContext';
import { ProductsContext } from '../context/ProductsContext';

const MyApp = ({ Component, pageProps, store }) => {
  const {
    productsFilters,
    addProductsFilter,
    clearProductsFilters,
    removeProductsFilter,
    setProductsSorting,
    setPage
  } = useProducts();
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
    <ProductsContext.Provider
      value={{
        productsFilters,
        addProductsFilter,
        clearProductsFilters,
        removeProductsFilter,
        setProductsSorting,
        setPage
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
    </ProductsContext.Provider>
  );
};

MyApp.getInitialProps = async ({ Component, ctx }) => {
  const pageProps = Component.getInitialProps
    ? await Component.getInitialProps(ctx)
    : {};
  return { pageProps };
};

export default withRedux(createStore)(MyApp);
