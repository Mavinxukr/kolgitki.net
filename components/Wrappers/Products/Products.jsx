import React from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Products.scss';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import { withResponse } from '../../hoc/withResponse';
import Button from '../../Layout/Button/Button';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import FiltersMobile from '../../FiltersMobile/FiltersMobile';
import FilterPrice from '../../FilterPrice/FilterPrice';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';

const DynamicComponentWithNoSSRProductCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const Products = ({
  products,
  classNameWrapper,
  router,
  pathname,
  action,
  filters,
  categories,
  isDesktopScreen,
}) => (
  <div className={cx(styles.productsWrapper, classNameWrapper)}>
    {(isDesktopScreen && (
      <div className={styles.leftSide}>
        <div className={styles.leftSideControllerWrapper}>
          <Filter
            title={parseText(cookies, 'Торговая марка', 'Торгова марка')}
            id="marks"
            arrSelects={filters[0].brands}
            router={router}
            pathname={pathname}
            categoryName="brands"
            classNameWrapper={styles.filterBrandWrapper}
          />
        </div>
        <Categories
          classNameWrapper={styles.categoriesWrapper}
          arrSubCategories={categories}
          router={router}
          pathname={pathname}
        />
      </div>
    )) || (
      <>
        <div className={styles.sortWrapperMobile}>
          <CategoriesMobile
            classNameWrapper={styles.categoriesMobileWrapper}
            pathname={pathname}
            router={router}
            productsLength={products.data.length}
            categories={categories}
          />
          <FiltersMobile
            pathname={pathname}
            router={router}
            classNameWrapper={styles.filtersMobileWrapper}
            productsLength={products.data.length}
            filters={filters}
          />
        </div>
        <p className={styles.productsCounter}>
          {products.data.length} {parseText(cookies, 'Товара', 'Товару')}
        </p>
      </>
    )}
    <div className={styles.rightSide}>
      {isDesktopScreen && (
        <>
          <div className={styles.controllersWrapper}>
            <Filter
              classNameWrapper={styles.filtersWrapper}
              title={parseText(cookies, 'Размер', 'Розмір')}
              arrSelects={filters[3].sizes}
              id="size"
              router={router}
              pathname={pathname}
              categoryName="sizes"
            />
            <Filter
              classNameWrapper={styles.filtersWrapper}
              title={parseText(cookies, 'Цвет', 'Колір')}
              arrSelects={filters[0].colors}
              id="color"
              router={router}
              pathname={pathname}
              categoryName="colors"
            />
            <Filter
              classNameWrapper={styles.filtersWrapper}
              title={parseText(cookies, 'Плотность', 'Щільність')}
              arrSelects={filters[1].attributes[0].value}
              id="destiny"
              router={router}
              pathname={pathname}
              categoryName="attribute"
              classNameAdditional={styles.filterAddWrapperAdd}
            />
            <Filter
              classNameWrapper={styles.filtersWrapper}
              title={parseText(cookies, 'Материал', 'Матеріал')}
              arrSelects={filters[1].attributes[1].value}
              id="stuff"
              router={router}
              pathname={pathname}
              categoryName="attribute"
              classNameAdditional={styles.filterAddWrapperAdd}
            />
            <Filter
              classNameWrapper={styles.filtersWrapper}
              title={parseText(cookies, 'Стоимость', 'Вартість')}
              id="price"
              router={router}
              pathname={pathname}
              classNameAdditional={styles.filterAddWrapper}
            >
              <FilterPrice
                classNameWrapper={styles.filterPriceWrapper}
                router={router}
                pathname={pathname}
              />
            </Filter>
          </div>
          <Sort router={router} pathname={pathname} />
        </>
      )}
      <div className={styles.cards}>
        {products.data.length > 0 ? (
          products.data.map(item => (
            <>
              <DynamicComponentWithNoSSRProductCard
                key={item.id}
                classNameWrapper={styles.card}
                item={item}
              />
            </>
          ))
        ) : (
          <p className={styles.notFoundText}>Ничего не найдено</p>
        )}
      </div>
      {products.last_page !== 1 && (
        <div className={styles.addElements}>
          <Pagination
            pageCount={products.last_page}
            currentPage={products.current_page}
            pathName={pathname}
          />
          {cookies.get('filters').page !== products.last_page && (
            <Button
              buttonType="button"
              title="Показать ещё +25"
              titleUa="Показати ще +25"
              viewType="pagination"
              classNameWrapper={styles.paginationButtonWrapper}
              disabled={products.current_page + 1 > products.last_page}
              onClick={action}
            />
          )}
        </div>
      )}
    </div>
  </div>
);

Products.propTypes = {
  products: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.object),
    last_page: PropTypes.number,
    current_page: PropTypes.number,
  }),
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
  action: PropTypes.func,
  filters: PropTypes.arrayOf(PropTypes.object),
  categories: PropTypes.arrayOf(PropTypes.object),
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Products);
