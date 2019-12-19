import React from 'react';
import dynamic from 'next/dist/next-server/lib/dynamic';
import BreadCrumbs from '../Layout/BreadCrumbs/BreadCrumbs';
import MainLayout from '../Layout/Global/Global';
import SeenProducts from './SeenProducts/SeenProducts';
import FeaturesCards from '../Layout/FeaturesCards/FeaturesCards';
import SimilarProduct from './SimilarProducts/SimilarProducts';
import Dropdowns from './Dropdowns/Dropdowns';
import ProductDetails from './ProductDetails/ProductDetails';
import styles from './Product.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('./ProductSlider/ProductSlider'),
  { ssr: false },
);

const Product = () => (
  <MainLayout>
    <div className={styles.product}>
      <BreadCrumbs value={['Главная', '/ Колготки', '/ Pola 90 model 3']} />
      <div className={styles.mainInfoProduct}>
        <DynamicComponentWithNoSSRSlider />
        <ProductDetails />
      </div>
      <div className={styles.infoForUser}>
        <SimilarProduct />
        <Dropdowns />
      </div>
      <SeenProducts />
      <div className={styles.featuresCards}>
        <FeaturesCards />
      </div>
    </div>
  </MainLayout>
);

export default Product;
