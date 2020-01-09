import dynamic from 'next/dynamic';
import { getDataById } from '../../services/product';

const DynamicComponentWithNoSSRProductWrapper = dynamic(
  () => import('../../components/Wrappers/Product/Product'),
  { ssr: false },
);

DynamicComponentWithNoSSRProductWrapper.getInitialProps = async ({ query }) => {
  const productData = await getDataById({
    namespace: 'goods',
    id: Number(query.pid),
  });

  return {
    productData: productData.data,
  };
};

export default DynamicComponentWithNoSSRProductWrapper;
