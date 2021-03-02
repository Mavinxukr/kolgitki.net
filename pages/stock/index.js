import StockWrapper from '../../components/Wrappers/Stocks/Stocks';
import { getStocks } from '../../redux/actions/stocks';
import { cookies } from '../../utils/getCookies';

StockWrapper.getInitialProps = async ({ store }) => {
  // store.dispatch(
  //   getStocks(
  //     {},
  //     {
  //       category_id:
  //         (cookies.get('filters')
  //           && cookies.get('filters').categories
  //           && cookies.get('filters').categories[
  //             cookies.get('filters').categories.length - 1
  //           ].id)
  //         || '',
  //     },
  //   ),
  // );
};

export default StockWrapper;
