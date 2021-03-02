import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import Filter from '../../components/Wrappers/StockProducts/StockFilters/Filter/Filter';
import MobileSideBar from '../MobileSideBar/MobileSideBar';
import { cookies } from '../../utils/getCookies';
import styles from './FiltersMobile.scss';
import ProductSort from '../ProductSort/ProductSort';
import { parseText } from '../../utils/helpers';

const calculateFiltersCount = filters => {
  let count = 0;
  _.forIn(filters, (value, key) => {
    if (
      key !== 'categories' &&
      key !== 'category_id' &&
      !key.startsWith('sort')
    ) {
      count += 1;
    }
  });
  return count;
};

const FiltersMobile = ({
  router,
  pathname,
  classNameWrapper,
  installedFilters,
  setFilters,
  clearFilters,
  setSorting,
  removeFilter,
  allFiltersSizes,
  allFilrersBrands,
  allFilrersColors,
  allFilrersMaterials,
  allFilrersDensity
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);

  const changeHandler = (ev, selected) => {
    const value = ev.target.parentNode.querySelector('label p').innerHTML;
    if (ev.target.checked) {
      setFilters(ev.target.name, JSON.stringify([...selected, value]));
    } else {
      removeFilter(ev.target.name, value);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpenSideBar(true)}
        className={cx(styles.button, classNameWrapper)}
        type="button"
      >
        {parseText(cookies, 'Фильтры', 'Фільтри')}
        <span className={styles.filtersCounter}>
          {calculateFiltersCount(installedFilters)}
        </span>
      </button>
      <MobileSideBar
        title={parseText(cookies, 'Фильтры', 'Фільтри')}
        pathname={pathname}
        router={router}
        setIsOpenSideBar={setIsOpenSideBar}
        isOpenSideBar={isOpenSideBar}
        clearFilter={clearFilters}
      >
        <ProductSort
          installedFilters={installedFilters}
          setSorting={setSorting}
        ></ProductSort>
        <Filter
          title={parseText(cookies, 'Размер', 'Розмір')}
          arrSelects={allFiltersSizes}
          id="size"
          selected={
            (installedFilters?.sizes && JSON.parse(installedFilters.sizes)) ||
            []
          }
          changeHandle={ev =>
            changeHandler(
              ev,
              (installedFilters?.sizes && JSON.parse(installedFilters.sizes)) ||
                []
            )
          }
          categoryName="sizes"
        />
        <Filter
          title={parseText(cookies, 'Цвет', 'Колір')}
          arrSelects={allFilrersColors}
          id="color"
          selected={
            (installedFilters?.colors && JSON.parse(installedFilters.colors)) ||
            []
          }
          changeHandle={ev =>
            changeHandler(
              ev,
              (installedFilters?.colors &&
                JSON.parse(installedFilters.colors)) ||
                []
            )
          }
          categoryName="colors"
        />
        <Filter
          title={parseText(cookies, 'Плотность', 'Щільність')}
          arrSelects={allFilrersDensity}
          id="density"
          selected={
            (installedFilters?.attribute &&
              JSON.parse(installedFilters.attribute)) ||
            []
          }
          changeHandle={ev =>
            changeHandler(
              ev,
              (installedFilters?.attribute &&
                JSON.parse(installedFilters.attribute)) ||
                []
            )
          }
          categoryName="attribute"
        />
        <Filter
          title={parseText(cookies, 'Бренд', 'Бренд')}
          arrSelects={allFilrersBrands}
          id="brand"
          selected={
            (installedFilters?.brands && JSON.parse(installedFilters.brands)) ||
            []
          }
          changeHandle={ev =>
            changeHandler(
              ev,
              (installedFilters?.brands &&
                JSON.parse(installedFilters.brands)) ||
                []
            )
          }
          categoryName="brands"
        />
        <Filter
          title={parseText(cookies, 'Материал', 'Матеріал')}
          arrSelects={allFilrersMaterials}
          changeHandle={ev =>
            changeHandler(
              ev,
              (installedFilters.attribute &&
                JSON.parse(installedFilters.attribute)) ||
                []
            )
          }
          id="material"
          selected={
            (installedFilters.attribute &&
              JSON.parse(installedFilters.attribute)) ||
            []
          }
          categoryName="attribute"
        />
      </MobileSideBar>
    </>
  );
};

FiltersMobile.propTypes = {
  classNameWrapper: PropTypes.string,
  router: PropTypes.object,
  pathname: PropTypes.string,
  productsLength: PropTypes.number,
  installedFilters: PropTypes.arrayOf(PropTypes.object)
};

export default FiltersMobile;
