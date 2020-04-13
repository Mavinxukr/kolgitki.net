import dynamic from 'next/dynamic';
import {
  getSliderData,
  getCollectionsData,
  getPopularCategories,
  getTopGoods,
  getInstagramData,
} from '../services/home';

const DynamicComponentWithNoSSRHomeWrapper = dynamic(
  () => import('../components/Wrappers/Home/Home'),
  { ssr: false },
);

DynamicComponentWithNoSSRHomeWrapper.getInitialProps = async () => {
  const sliderData = await getSliderData({});
  const bestProductData = await getTopGoods({});
  const collectionData = await getCollectionsData({});
  const popularCategories = await getPopularCategories({});
  const instagramData = await getInstagramData({});

  return {
    sliderData: sliderData.data,
    bestProductData: bestProductData.data,
    collectionData: collectionData.data,
    popularCategories: popularCategories.data,
    instagramData: instagramData.data,
  };
};

export default DynamicComponentWithNoSSRHomeWrapper;
