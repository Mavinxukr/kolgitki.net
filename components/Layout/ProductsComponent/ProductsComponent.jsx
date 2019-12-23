import React from 'react';
import dynamic from 'next/dynamic';
import {
  sizes, densities, stuff, colors, marks,
} from './data';
import IconArrow from '../../../assets/svg/Group 6212.svg';
import Styles from './ProductsComponent.module.scss';

const DynamicComponentWithNoSSRSliderProductCard = dynamic(
  () => import('../ProductCard/ProductCard'),
  { ssr: false },
);

const Filter = ({ title, arrSelects, id, width }) => (
  <div style={{ width: `${width}` }} className={Styles.ProductsComponent__ControllersItem}>
    <input className={Styles.ProductsComponent__Field} type="checkbox" id={id} />
    <label className={Styles.ProductsComponent__ParamController} htmlFor={id}>{title}</label>
    <div className={Styles.ProductsComponent__DropDownListWrapper}>
      <ul className={Styles.ProductsComponent__DropDownList}>
        {
          arrSelects.map(item => (
            <li className={Styles.ProductsComponent__DropDownItem} key={item.id}>
              <input type="checkbox" id={item.value} className={Styles.ProductsComponent__Field} />
              {
                item.color ? (
                  <label
                    htmlFor={item.value}
                    className={Styles.ProductsComponent__DropDownController}
                  ><span className={Styles.ProductsComponent__ColorBlock} style={{ backgroundColor: `${item.color}` }} /> {item.value}
                  </label>
                ) : <label htmlFor={item.value} className={Styles.ProductsComponent__DropDownController}>{item.value}</label>
              }
            </li>
          ))
        }
      </ul>
    </div>
  </div>
);

const ProductsComponent = ({ products }) => (
  <div className={Styles.ProductsComponent}>
    <div className={Styles.ProductsComponent__LeftSide}>
      <div className={Styles.ProductsComponent__LeftSideControllerWrapper}>
        <Filter title="Торговая марка" id="marks" arrSelects={marks} width="244px" />
      </div>
      <h2 className={Styles.ProductsComponent__MarkTitle}>Колготки</h2>
      <ul className={Styles.ProductsComponent__MarkList}>
        <li className={Styles.ProductsComponent__MarkListItem}>Premium Line</li>
        <li className={Styles.ProductsComponent__MarkListItem}>Без шортиков</li>
        <li className={Styles.ProductsComponent__MarkListItem}>Для беременных</li>
        <li className={Styles.ProductsComponent__MarkListItem}>Корректирующие</li>
        <li className={Styles.ProductsComponent__MarkListItem}>Матовые</li>
        <li className={Styles.ProductsComponent__MarkListItem}>Поддерживающие</li>
        <li className={Styles.ProductsComponent__MarkListItem}>Эффектный шов</li>
      </ul>
      <input className={Styles.ProductsComponent__Field} type="checkbox" id="stockings" />
      <label className={Styles.ProductsComponent__Controller} htmlFor="stockings">Чулки</label>
      <input className={Styles.ProductsComponent__Field} type="checkbox" id="clothes" />
      <label className={Styles.ProductsComponent__Controller} htmlFor="clothes">Одежда</label>
      <input className={Styles.ProductsComponent__Field} type="checkbox" id="socks" />
      <label className={Styles.ProductsComponent__Controller} htmlFor="socks">Носки</label>
      <input className={Styles.ProductsComponent__Field} type="checkbox" id="underwear" />
      <label className={Styles.ProductsComponent__Controller} htmlFor="underwear">Нижнее белье</label>
      <input className={Styles.ProductsComponent__Field} type="checkbox" id="swimwear" />
      <label className={Styles.ProductsComponent__Controller} htmlFor="swimwear">Купальники</label>
    </div>
    <div className={Styles.ProductsComponent__RightSide}>
      <div className={Styles.ProductsComponent__ControllersWrapper}>
        <Filter width="25%" title="Размер" arrSelects={sizes} id="size" />
        <Filter width="25%" title="Цвет" arrSelects={colors} id="color" />
        <Filter width="25%" title="Плотность" arrSelects={densities} id="destiny" />
        <Filter width="25%" title="Материал" arrSelects={stuff} id="stuff" />
      </div>
      <div className={Styles.ProductsComponent__SortBlock}>
        <p className={Styles.ProductsComponent__SortDesc}>Сперва:</p>
        <input className={Styles.ProductsComponent__Field} type="checkbox" id="first" />
        <label className={Styles.ProductsComponent__SortController} htmlFor="first">Популярные</label>
      </div>
      <div className={Styles.ProductsComponent__Cards}>
        {
          products.map(item => (
            <div className={Styles.ProductsComponent__Card} key={item.id}>
              <DynamicComponentWithNoSSRSliderProductCard item={item} />
            </div>
          ))
        }
      </div>
      <div className={Styles.ProductsComponent__AddElements}>
        <div className={Styles.ProductsComponent__Pagination}>
          <button className={Styles.ProductsComponent__PaginationArrowButton} type="button">
            <IconArrow className={Styles.ProductsComponent__PaginationArrowLeft} />
          </button>
          <button className={`${Styles.ProductsComponent__PaginationPageButton} ${Styles.ProductsComponent__PaginationPageButtonFirst}`} type="button">1</button>
          <button className={Styles.ProductsComponent__PaginationPageButton} type="button">2</button>
          <button className={Styles.ProductsComponent__PaginationPageButton} type="button">3</button>
          <button className={Styles.ProductsComponent__PaginationPageButton} type="button">4</button>
          <button className={Styles.ProductsComponent__PaginationPageButton} type="button">...</button>
          <button className={`${Styles.ProductsComponent__PaginationPageButton} ${Styles.ProductsComponent__PaginationPageButtonLast}`} type="button">8</button>
          <button className={Styles.ProductsComponent__PaginationArrowButton} type="button">
            <IconArrow className={Styles.ProductsComponent__PaginationArrowRight} />
          </button>
        </div>
        <button type="button" className={Styles.ProductsComponent__ShowMoreButton}>Показать ещё +25</button>
      </div>
    </div>
  </div>
);

export default ProductsComponent;
