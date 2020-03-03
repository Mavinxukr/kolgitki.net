import React from 'react';
import dynamic from 'next/dist/next-server/lib/dynamic';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import { data } from './data';
import { dataCategories } from './dataCategories';
import { products } from './products';
import styles from './GiftBackets.scss';

// const DynamicComponentWithNoSSRGiftProductCard = dynamic(
//   () => import('../../Layout/GiftProductCard/GiftProductCard'),
//   { ssr: false },
// );

const GiftBackets = () => (
  <MainLayout>
    <div className={styles.giftBaskets}>
      <div className={styles.header}>
        <BreadCrumbs items={['Главная', 'Подарочные наборы']} />
        <FilterIndicators
          buttonValue="Удалить все поводы"
          countOfProducts="150 товаров"
          classNameWrapper={styles.filterIndicatorsWrapper}
        />
      </div>
      <div className={styles.products}>
        <Categories
          classNameWrapper={styles.leftSide}
          arrSubCategories={dataCategories}
        />
        <div className={styles.rightSide}>
          <div className={styles.controllersWrapper}>
            <Filter
              classNameWrapper={styles.filterWrapper}
              title="Размер"
              arrSelects={data}
              id="gift"
            />
          </div>
          <Sort />
          <div className={styles.cards}>
            {/* {products.map(item => ( */}
            {/*  <DynamicComponentWithNoSSRGiftProductCard */}
            {/*    classNameWrapper={styles.card} */}
            {/*    key={item.id} */}
            {/*    item={item} */}
            {/*  /> */}
            {/* ))} */}
          </div>
          <div className={styles.addElements}>
            <Pagination />
            <Button
              buttonType="button"
              title="Показать ещё +25"
              viewType="pagination"
              classNameWrapper={styles.showMoreButton}
            />
          </div>
          <div className={styles.descBlock}>
            <h4>Чтобы оформить возврат, нужно сделать 3 шага:</h4>
            <p className={styles.descText}>
              Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был
              максимально приятным, и разработали максимально простую и удобную
              процедуру возврата.
            </p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default GiftBackets;
