import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import Filter from '../Filter/Filter';
import Sort from '../Sort/Sort';
import SideBarFilter from '../SideBarFilter/SideBarFilter';
import styles from './FiltersMobile.scss';

const checkOnNotAllowFilters = key => ['categories', 'page', 'slug'].some(item => item === key);

const calculateFiltersCount = (router) => {
  let count = 0;
  _.forIn(router.query, (value, key) => {
    if (!checkOnNotAllowFilters(key)) {
      count += 1;
    }
  });
  return count;
};

const FiltersMobile = ({
  router,
  pathname,
  classNameWrapper,
  productsLength,
  filters,
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpenSideBar(true)}
        className={cx(styles.button, classNameWrapper)}
        type="button"
      >
        Фильтры{' '}
        <span className={styles.filtersCounter}>
          {calculateFiltersCount(router)}
        </span>
      </button>
      <SideBarFilter
        title="Фильтры"
        pathname={pathname}
        router={router}
        productsLength={productsLength}
        setIsOpenSideBar={setIsOpenSideBar}
        isOpenSideBar={isOpenSideBar}
      >
        <Sort router={router} pathname={pathname} />
        <Filter
          router={router}
          pathname={pathname}
          id="marks"
          categoryName="brands"
          title="Торговая марка"
          arrSelects={filters[0].brands}
        />
        <Filter
          router={router}
          pathname={pathname}
          title="Размер"
          id="size"
          categoryName="sizes"
          arrSelects={filters[3].sizes}
        />
        <Filter
          router={router}
          pathname={pathname}
          title="Цвет"
          id="color"
          categoryName="colors"
          arrSelects={filters[0].colors}
        />
        <Filter
          router={router}
          pathname={pathname}
          title="Плотность"
          id="destiny"
          categoryName="attribute"
          arrSelects={filters[1].attributes[0].value}
        />
        <Filter
          router={router}
          pathname={pathname}
          title="Материал"
          id="stuff"
          categoryName="attribute"
          arrSelects={filters[1].attributes[1].value}
        />
      </SideBarFilter>
    </>
  );
};

FiltersMobile.propTypes = {
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
  productsLength: PropTypes.number,
  filters: PropTypes.arrayOf(PropTypes.object),
};

export default FiltersMobile;
