import React from 'react';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import Filter from './Filter/Filter';
import classes from './StockFilters.scss';

const StockFilters = React.memo(
  ({
    installedFilters,
    setFilters,
    allFiltersSizes,
    allFilrersBrands,
    allFilrersColors,
    allFilrersMaterials,
    allFilrersDensity
  }) => {
    const changeHandle = (ev, selected) => {
      const value = ev.target.parentNode.querySelector('label p').innerHTML;
      if (ev.target.checked) {
        setFilters(ev.target.name, JSON.stringify([...selected, value]));
      } else {
        setFilters(
          ev.target.name,
          JSON.stringify(selected.filter(i => i !== value))
        );
      }
    };

    return (
      <div className={classes.block}>
        <Filter
          title={parseText(cookies, 'Размер', 'Розмір')}
          arrSelects={allFiltersSizes}
          id="size"
          changeHandle={ev =>
            changeHandle(
              ev,
              (installedFilters?.sizes && JSON.parse(installedFilters.sizes)) ||
                []
            )
          }
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
          changeHandle={ev =>
            changeHandle(
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
            changeHandle(
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
            changeHandle(
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
            changeHandle(
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
      </div>
    );
  }
);

export default StockFilters;
