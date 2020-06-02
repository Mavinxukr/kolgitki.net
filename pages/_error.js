import React from 'react';
import { useRouter } from 'next/router';
import Catalog from '../components/Wrappers/Catalog/Catalog';
import GiftBackets from '../components/Wrappers/GiftBackets/GiftBackets';
import Stocks from '../components/Wrappers/Stocks/Stocks';
import NotFoundWrapper from '../components/Wrappers/NotFound/NotFound';

const Error = ({ statusCode }) => {
  const router = useRouter();

  return (
    <p>
      {statusCode && router.asPath.indexOf('/Products_') !== -1 && <Catalog />
      || statusCode && router.asPath.indexOf('/gift-backets_') !== -1 && <GiftBackets />
      || statusCode && router.asPath.indexOf('/stock_') !== -1 && <Stocks /> || <NotFoundWrapper />}
    </p>
  );
};

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;
