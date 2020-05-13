import BrandWrapper from '../../components/Wrappers/Brand/Brand';
import { getBrandById } from '../../services/brand';

BrandWrapper.getInitialProps = async ({ query }) => {
  const brandData = await getBrandById({}, +query.brand_id.split('_')[0]);

  return {
    brandData: brandData.data,
  };
};

export default BrandWrapper;
