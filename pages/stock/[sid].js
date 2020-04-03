import dynamic from 'next/dynamic';
import { getStockData } from '../../redux/actions/stockData';

const DynamicComponentWithNoSSR = dynamic(
  () => import('../../components/Wrappers/Stock/Stock'),
  { ssr: false },
);

DynamicComponentWithNoSSR.getInitialProps = async ({ store, query }) => {
  store.dispatch(getStockData({}, query.slug));
};

export default DynamicComponentWithNoSSR;
