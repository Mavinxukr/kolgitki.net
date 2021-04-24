import React, { useState } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import cx from 'classnames';
import MobileSideBar from '../MobileSideBar/MobileSideBar';
import { cookies } from '../../utils/getCookies';
import styles from './FiltersMobile.scss';
import ProductSort from '../ProductSort/ProductSort';
import { parseText } from '../../utils/helpers';
import Filter from '../Filter/Filter';

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
  return Number(count);
};

const FiltersMobile = ({
  loading,
  installedFilters,
  setFilters,
  removeOneFilter,
  setSorting,
  clearFilters,
  updateProducts,
  allFiltersSizes,
  allFilrersBrands,
  allFilrersColors,
  allFilrersMaterials,
  allFilrersDensity
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleFilter = (checked, filter, name) => {
    if (checked) {
      setFilters(prev => {
        const next = { ...prev };
        const old = next.hasOwnProperty(filter) ? next[filter].split('|') : [];
        next[filter] = [...old, name].join('|');
        return next;
      });
    } else {
      removeOneFilter(filter, name);
    }
  };
  return (
    <>
      <button
        onClick={() => setIsOpenSideBar(true)}
        className={cx(styles.button)}
        type="button"
      >
        {parseText(cookies, 'Фильтры', 'Фільтри')}
        {calculateFiltersCount(installedFilters) > 0 && (
          <span className={styles.filtersCounter}>
            {calculateFiltersCount(installedFilters)}
          </span>
        )}
      </button>
      <MobileSideBar
        title={parseText(cookies, 'Фильтры', 'Фільтри')}
        loading={loading}
        setIsOpenSideBar={setIsOpenSideBar}
        isOpenSideBar={isOpenSideBar}
        clearFilter={() => clearFilters()}
        getProductHandle={() => updateProducts(installedFilters)}
      >
        <ProductSort
          setSorting={sort => {
            setIsOpenSideBar(false);
            setSorting(sort);
          }}
          usedSort={installedFilters}
        ></ProductSort>
        <Filter
          title={parseText(cookies, 'Размер', 'Розмір')}
          arrSelects={allFiltersSizes}
          id="size"
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          selected={
            (installedFilters?.sizes && installedFilters.sizes.split('|')) || []
          }
          categoryName="sizes"
        />
        <Filter
          title={parseText(cookies, 'Цвет', 'Колір')}
          arrSelects={allFilrersColors}
          id="color"
          selected={
            (installedFilters?.colors && installedFilters.colors.split('|')) ||
            []
          }
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          categoryName="colors"
        />
        <Filter
          title={parseText(cookies, 'Плотность', 'Щільність')}
          arrSelects={allFilrersDensity}
          id="density"
          selected={
            (installedFilters?.dencity &&
              installedFilters.dencity.split('|')) ||
            []
          }
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          categoryName="dencity"
        />
        <Filter
          title={parseText(cookies, 'Бренд', 'Бренд')}
          arrSelects={allFilrersBrands}
          id="brand"
          selected={
            (installedFilters?.brands && installedFilters.brands.split('|')) ||
            []
          }
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          categoryName="brands"
        />
        <Filter
          title={parseText(cookies, 'Материал', 'Матеріал')}
          arrSelects={allFilrersMaterials}
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          id="materials"
          selected={
            (installedFilters?.materials &&
              installedFilters.materials.split('|')) ||
            []
          }
          categoryName="materials"
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
  installedFilters: PropTypes.object
};

export default FiltersMobile;
