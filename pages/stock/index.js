import StockWrapper from '../../components/Wrappers/Stocks/Stocks';
import { getStocks } from '../../redux/actions/stocks';

StockWrapper.getInitialProps = async ({ store }) => {
  store.dispatch(getStocks({}, {}));
};

export default StockWrapper;
