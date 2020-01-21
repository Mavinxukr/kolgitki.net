import BrandWrapper from '../../components/Wrappers/Brand/Brand';
import { getBrandBySlag } from '../../services/brand';

BrandWrapper.getInitialProps = async ({ query }) => {
  const brandData = await getBrandBySlag({}, query.bid);

  return {
    brandData: brandData.data,
  };
};

export default BrandWrapper;