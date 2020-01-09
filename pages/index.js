import dynamic from 'next/dynamic';
import { getData } from '../services/home';

const DynamicComponentWithNoSSRHomeWrapper = dynamic(
  () => import('../components/Wrappers/Home/Home'),
  { ssr: false },
);

DynamicComponentWithNoSSRHomeWrapper.getInitialProps = async () => {
  const sliderData = await getData({ namespace: 'slider' });
  const bestProductData = await getData({ namespace: 'top-goods' });
  const collectionData = await getData({ namespace: 'collections' });
  const popularCategories = await getData({ namespace: 'category' });

  return {
    sliderData: sliderData.data,
    bestProductData: bestProductData.data,
    collectionData: collectionData.data,
    popularCategories: popularCategories.data,
  };
};

export default DynamicComponentWithNoSSRHomeWrapper;
