import React from 'react';
import dynamic from 'next/dist/next-server/lib/dynamic';
import styles from './GIftBackets.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import { data } from './data';
import { dataCategories } from './dataCategories';
import { products } from './products';

const DynamicComponentWithNoSSRSliderGiftProductCard = dynamic(
  () => import('../../Layout/GiftProductCard/GiftProductCard'),
  { ssr: false },
);

const GiftBaskets = () => (
  <MainLayout>
    <div className={styles.giftBaskets}>
      <div className={styles.header}>
        <BreadCrumbs value={['Главная', '/ Подарочные наборы']} />
        <div className={styles.filterIndicatorsWrapper}>
          <FilterIndicators
            buttonValue="Удалить все поводы"
            countOfProducts="150 товаров"
          />
        </div>
      </div>
      <div className={styles.products}>
        <div className={styles.leftSide}>
          <Categories arrSubCategories={dataCategories} />
        </div>
        <div className={styles.rightSide}>
          <div className={styles.controllersWrapper}>
            <Filter width="270px" title="Размер" arrSelects={data} id="gift" />
          </div>
          <Sort />
          <div className={styles.cards}>
            {products.map(item => (
              <div className={styles.card} key={item.id}>
                <DynamicComponentWithNoSSRSliderGiftProductCard item={item} />
              </div>
            ))}
          </div>
          <div className={styles.addElements}>
            <Pagination />
            <button type="button" className={styles.showMoreButton}>
              Показать ещё +25
            </button>
          </div>
          <div className={styles.descBlock}>
            <h4 className={styles.descTitle}>Чтобы оформить возврат, нужно сделать 3 шага:</h4>
            <p className={styles.descText}>
              Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным,
              и разработали максимально простую и удобную процедуру возврата.
            </p>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default GiftBaskets;
