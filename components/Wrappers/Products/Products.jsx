import React from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import FilterIndicators from '../../FilterIndicators/FilterIndicators';
import styles from './Products.scss';
import Filter from '../../Filter/Filter';
import Categories from '../../Categories/Categories';
import Sort from '../../Sort/Sort';
import Pagination from '../../Pagination/Pagination';
import { withResponse } from '../../hoc/withResponse';
import Button from '../../Layout/Button/Button';
import CategoriesMobile from '../../CategoriesMobile/CategoriesMobile';
import FiltersMobile from '../../FiltersMobile/FiltersMobile';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import { userDataSelector } from '../../../utils/selectors';

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
}) => {
  const userData = useSelector(userDataSelector);
  return (
    <div className={cx(styles.productsWrapper, classNameWrapper)}>
      {(isDesktopScreen && (
        <div className={styles.leftSide}>
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
              productsLength={products?.data?.length}
              categories={categories}
            />
            <FiltersMobile
              pathname={pathname}
              router={router}
              classNameWrapper={styles.filtersMobileWrapper}
              productsLength={products?.data?.length}
              filters={filters}
            />
          </div>
          <p className={styles.productsCounter}>
            {products?.data?.length} {parseText(cookies, 'Товара', 'Товару')}
          </p>
        </>
      )}
      <div className={styles.rightSide}>
        <FilterIndicators
          buttonValue="Удалить фильтры"
          buttonValueUa="Видалити фільтри"
          router={router}
          pathname="/Products"
        />
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
                arrSelects={filters[1].attributes[1].value}
                id="destiny"
                router={router}
                pathname={pathname}
                categoryName="attribute"
                classNameAdditional={styles.filterAddWrapperAdd}
              />
              <Filter
                title={parseText(cookies, 'Бренд', 'Бренд')}
                id="marks"
                arrSelects={filters[0].brands}
                router={router}
                pathname={pathname}
                categoryName="brands"
                classNameWrapper={styles.filtersWrapper}
              />
              <Filter
                title={parseText(cookies, 'Материал', 'Матеріал')}
                id="stuff"
                arrSelects={filters[1].attributes[0].value}
                classNameWrapper={styles.filtersWrapper}
                router={router}
                pathname={pathname}
                categoryName="attribute"
                classNameAdditional={styles.filterAddWrapperAdd}
              />
            </div>
            <Sort router={router} pathname={pathname} />
          </>
        )}
        <div className={styles.cards}>
          {products?.data?.length > 0 ? (
            products?.data.map(item => (
              <DynamicComponentWithNoSSRProductCard
                key={item.id}
                classNameWrapper={styles.card}
                item={item}
                isSimpleProduct
                userDataId={userData?.role?.id}
              />
            ))
          ) : (
            <p className={styles.notFoundText}>Ничего не найдено</p>
          )}
        </div>
        {products?.last_page !== 1 && (
          <div className={styles.addElements}>
            <Pagination
              pageCount={products?.last_page}
              currentPage={products?.current_page}
              pathName={pathname}
            />
            {products?.last_page !== products?.current_page && (
              <Button
                buttonType="button"
                title="Показать ещё +25"
                titleUa="Показати ще +25"
                viewType="pagination"
                classNameWrapper={styles.paginationButtonWrapper}
                onClick={action}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

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
