import React from 'react';
import dynamic from 'next/dynamic';
import Styles from './ProductsComponent.module.scss';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import { dataCategories } from './dataCategories';
import {
  sizes, densities, stuff, colors, marks,
} from './data';

const DynamicComponentWithNoSSRSliderProductCard = dynamic(
  () => import('../ProductCard/ProductCard'),
  { ssr: false },
);

const ProductsComponent = ({ products }) => (
  <div className={Styles.ProductsComponent}>
    <div className={Styles.ProductsComponent__LeftSide}>
      <div className={Styles.ProductsComponent__LeftSideControllerWrapper}>
        <Filter title="Торговая марка" id="marks" arrSelects={marks} width="244px" />
      </div>
      <div className={Styles.ProductsComponent__CategoriesWrapper}>
        <Categories arrSubCategories={dataCategories} />
      </div>
    </div>
    <div className={Styles.ProductsComponent__RightSide}>
      <div className={Styles.ProductsComponent__ControllersWrapper}>
        <Filter width="25%" title="Размер" arrSelects={sizes} id="size" />
        <Filter width="25%" title="Цвет" arrSelects={colors} id="color" />
        <Filter width="25%" title="Плотность" arrSelects={densities} id="destiny" />
        <Filter width="25%" title="Материал" arrSelects={stuff} id="stuff" />
      </div>
     <Sort />
      <div className={Styles.ProductsComponent__Cards}>
        {
          products.map(item => (
            <div className={Styles.ProductsComponent__Card} key={item.id}>
              <DynamicComponentWithNoSSRSliderProductCard item={item} />
            </div>
          ))
        }
      </div>
      <div className={Styles.ProductsComponent__AddElements}>
        <Pagination />
        <button type="button" className={Styles.ProductsComponent__ShowMoreButton}>Показать ещё +25</button>
      </div>
    </div>
  </div>
);

export default ProductsComponent;
