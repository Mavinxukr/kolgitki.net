import BrandsWrapper from '../components/Wrappers/Brands/Brands';
import { getBrandsData } from '../services/brands';


BrandsWrapper.getInitialProps = async () => {
  const brandsData = await getBrandsData({});

  return {
    brandsData: brandsData.data,
  };
};

export default BrandsWrapper;
