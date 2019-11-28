import React from 'react';
import MainLayout from '../../UIComponents/MainLayout/MainLayout';
import BrandsBreadCrumbs from '../BrandsBreadCrumbs/BrandsBreadCrumbs';
import BrandsFilters from '../BrandsFilters/BrandsFilters';
import BrandsList from '../BrandsList/BrandsList';
import Styles from './MainBrandsComponent.module.scss';


const MainBrandsComponent = () => (
  <MainLayout>
    <div className={Styles.MainBrandsComponent__Content}>
      <BrandsBreadCrumbs />
      <BrandsFilters />
      <BrandsList />
      <div className={Styles.MainBrandsComponent__TextWrapper}>
        <p className={Styles.MainBrandsComponent__TextMain}>Чтобы оформить возврат, нужно сделать 3 шага:</p>
        <p className={Styles.MainBrandsComponent__Text}>
          На протяжении веков украинский народ развивал собственное
          музыкально искусство, театр и живопись. Некоторые украинские
          художники и их шедев известны не только в Украине, но и во всем мире.
        </p>
      </div>
    </div>
  </MainLayout>
);

export default MainBrandsComponent;
