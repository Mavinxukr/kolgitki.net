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
  allFiltersBrands,
  allFiltersColors,
  allFiltersMaterials,
  allFiltersDensity
}) => {
  const [isOpenSideBar, setIsOpenSideBar] = useState(false);
  const toggleFilter = (checked, filterName, filter) => {
    if (checked) {
      setFilters(prev => {
        const next = { ...prev };
        const old = next.hasOwnProperty(filterName) ? next[filterName] : [];
        next[filterName] = [...old, filter];
        return next;
      });
    } else {
      removeOneFilter(filterName, filter);
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
        getProductHandle={() => updateProducts()}
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
          selected={(installedFilters?.sizes && installedFilters.sizes) || []}
          categoryName="sizes"
        />
        <Filter
          title={parseText(cookies, 'Цвет', 'Колір')}
          arrSelects={allFiltersColors}
          id="color"
          selected={(installedFilters?.colors && installedFilters.colors) || []}
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          categoryName="colors"
        />
        <Filter
          title={parseText(cookies, 'Плотность', 'Щільність')}
          arrSelects={allFiltersDensity}
          id="density"
          selected={
            (installedFilters?.density && installedFilters.density) || []
          }
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          categoryName="dencity"
        />
        <Filter
          title={parseText(cookies, 'Бренд', 'Бренд')}
          arrSelects={allFiltersBrands}
          id="brand"
          selected={(installedFilters?.brands && installedFilters.brands) || []}
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          categoryName="brands"
        />
        <Filter
          title={parseText(cookies, 'Материал', 'Матеріал')}
          arrSelects={allFiltersMaterials}
          changeHandle={(checked, filter, name) =>
            toggleFilter(checked, filter, name)
          }
          id="materials"
          selected={
            (installedFilters?.materials && installedFilters.materials) || []
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
