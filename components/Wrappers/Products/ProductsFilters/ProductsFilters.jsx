import React from 'react';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import Filter from '../../../Filter/Filter';
import classes from './ProductsFilters.scss';

const ProductsFilters = React.memo(
  ({
    installedFilters,
    setFilters,
    removeOneFilter,
    allFiltersSizes,
    allFiltersBrands,
    allFiltersColors,
    allFiltersMaterials,
    allFiltersDensity
  }) => {
    const toggleFilter = (checked, filter, name) => {
      if (checked) {
        setFilters(prev => {
          const next = { ...prev };
          const old = next.hasOwnProperty(filter)
            ? next[filter].split('|')
            : [];
          next[filter] = [...old, name].join('|');
          return next;
        });
      } else {
        removeOneFilter(filter, name);
      }
    };

    return (
      <div className={classes.block}>
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
          arrSelects={allFiltersColors}
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
          arrSelects={allFiltersDensity}
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
          arrSelects={allFiltersBrands}
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
          arrSelects={allFiltersMaterials}
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
      </div>
    );
  }
);

export default ProductsFilters;
