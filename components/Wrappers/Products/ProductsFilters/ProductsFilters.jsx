import React from 'react';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import Filter from '../../../Filter/Filter';
import classes from './ProductsFilters.scss';

const ProductsFilters = React.memo(
  ({
    installedFilters,
    setFilters,
    clearFilters,
    allFiltersSizes,
    allFilrersBrands,
    allFilrersColors,
    allFilrersMaterials,
    allFilrersDensity
  }) => {
    const toggleFilter = (ev, filter, selected) => {
      if (ev.target.checked) {
        setFilters(ev.target.name, JSON.stringify([...selected, filter]));
      } else {
        let newFilterList = selected.filter(i => i.id !== filter.id);

        if (newFilterList.length === 0) {
          clearFilters([ev.target.name]);
        } else {
          setFilters(ev.target.name, JSON.stringify(newFilterList));
        }
      }
    };

    return (
      <div className={classes.block}>
        <Filter
          title={parseText(cookies, 'Размер', 'Розмір')}
          arrSelects={allFiltersSizes}
          id="size"
          changeHandle={(ev, filter) => {
            toggleFilter(
              ev,
              filter,
              (installedFilters?.sizes && JSON.parse(installedFilters.sizes)) ||
                []
            );
          }}
          selected={
            (installedFilters?.sizes && JSON.parse(installedFilters.sizes)) ||
            []
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
          changeHandle={(ev, filter) =>
            toggleFilter(
              ev,
              filter,
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
          changeHandle={(ev, filter) => {
            toggleFilter(
              ev,
              filter,
              (installedFilters?.attribute &&
                JSON.parse(installedFilters.attribute)) ||
                []
            );
          }}
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
          changeHandle={(ev, filter) =>
            toggleFilter(
              ev,
              filter,
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
          changeHandle={(ev, filter) =>
            toggleFilter(
              ev,
              filter,
              (installedFilters.attribute &&
                JSON.parse(installedFilters.attribute)) ||
                []
            )
          }
          id="material"
          selected={
            (installedFilters?.attribute &&
              JSON.parse(installedFilters.attribute)) ||
            []
          }
          categoryName="attribute"
        />
      </div>
    );
  }
);

export default ProductsFilters;
