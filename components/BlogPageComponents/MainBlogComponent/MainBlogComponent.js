import React from 'react';
import dynamic from 'next/dynamic';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import BlogBreadCrumbs from '../BlogBreadCrumbs/BlogBreadCrumbs';
import BlogRecomendation from '../BlogRecomendation/BlogRecomendation';
import ProductsComponent from '../../UIComponents/ProductsComponent/ProductsComponent';
import { data } from './data';
import IconArrow from '../../../assets/svg/Group 688.svg';
import Styles from './MainBlogComponent.module.scss';

const DynamicComponentWithNoBlogInfoComponent = dynamic(
  () => import('../BlogInfoComponent/BlogDetails'),
  { ssr: false },
);

const MainBlogComponent = () => (
  <MainLayout>
    <BlogBreadCrumbs />
    <a href="/" className={Styles.MainBlogComponent__LinkBack}><IconArrow className={Styles.MainBlogComponent__IconArrow} /> Назад</a>
    <div className={Styles.MainBlogComponent__WrapperContent}>
      <BlogRecomendation />
      <DynamicComponentWithNoBlogInfoComponent />
    </div>
    <a href="/" className={`${Styles.MainBlogComponent__LinkBack} ${Styles.MainBlogComponent__LinkBackBottom}`}><IconArrow className={Styles.MainBlogComponent__IconArrow} /> Назад</a>
    <hr className={Styles.MainBlogComponent__Line} />
    <div className={Styles.MainBlogComponent__Products}>
      <ProductsComponent products={data} />
    </div>
  </MainLayout>
);

export default MainBlogComponent;
