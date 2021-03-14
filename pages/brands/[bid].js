import BrandWrapper from '../../components/Wrappers/Brand/Brand';
import { getBrandById } from '../../services/brand';

BrandWrapper.getInitialProps = async ({ query }) => {
  const brandData = await getBrandById({}, query.bid.split('/')[0]);

  return {
    brandData: brandData.data
  };
};

export default BrandWrapper;
