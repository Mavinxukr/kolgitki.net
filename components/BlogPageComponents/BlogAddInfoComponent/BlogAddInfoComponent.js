import React from 'react';
import IconArrow from '../../../assets/svg/Group 6212.svg';
import BestProductCard from '../../UIComponents/BestProductCard/BestProductCard';
import Styles from './BlogAddInfoComponent.module.scss';
import { data } from './data';

const BlogAddInfoComponent = () => (
  <div className={Styles.BlogAddInfoComponent}>
    <div className={Styles.BlogAddInfoComponent__LeftSide}>
      <div className={Styles.BlogAddInfoComponent__LeftSideControllerWrapper}>
        <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="mark" />
        <label className={Styles.BlogAddInfoComponent__LeftSideController} htmlFor="mark">Торговая марка</label>
      </div>
      <h2 className={Styles.BlogAddInfoComponent__MarkTitle}>Колготки</h2>
      <ul className={Styles.BlogAddInfoComponent__MarkList}>
        <li className={Styles.BlogAddInfoComponent__MarkListItem}>Premium Line</li>
        <li className={Styles.BlogAddInfoComponent__MarkListItem}>Без шортиков</li>
        <li className={Styles.BlogAddInfoComponent__MarkListItem}>Для беременных</li>
        <li className={Styles.BlogAddInfoComponent__MarkListItem}>Корректирующие</li>
        <li className={Styles.BlogAddInfoComponent__MarkListItem}>Матовые</li>
        <li className={Styles.BlogAddInfoComponent__MarkListItem}>Поддерживающие</li>
        <li className={Styles.BlogAddInfoComponent__MarkListItem}>Эффектный шов</li>
      </ul>
      <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="stockings" />
      <label className={Styles.BlogAddInfoComponent__Controller} htmlFor="stockings">Чулки</label>
      <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="clothes" />
      <label className={Styles.BlogAddInfoComponent__Controller} htmlFor="clothes">Одежда</label>
      <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="socks" />
      <label className={Styles.BlogAddInfoComponent__Controller} htmlFor="socks">Носки</label>
      <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="underwear" />
      <label className={Styles.BlogAddInfoComponent__Controller} htmlFor="underwear">Нижнее белье</label>
      <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="swimwear" />
      <label className={Styles.BlogAddInfoComponent__Controller} htmlFor="swimwear">Купальники</label>
    </div>
    <div className={Styles.BlogAddInfoComponent__RightSide}>
      <div className={Styles.BlogAddInfoComponent__ControllersWrapper}>
        <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="size" />
        <label className={`${Styles.BlogAddInfoComponent__ParamController} ${Styles.BlogAddInfoComponent__ParamControllerSize}`} htmlFor="size">Размер</label>
        <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="color" />
        <label className={`${Styles.BlogAddInfoComponent__ParamController} ${Styles.BlogAddInfoComponent__ParamControllerColor}`} htmlFor="color">Цвет</label>
        <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="density" />
        <label className={`${Styles.BlogAddInfoComponent__ParamController} ${Styles.BlogAddInfoComponent__ParamControllerDestiny}`} htmlFor="density">Плотность</label>
        <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="stuff" />
        <label className={`${Styles.BlogAddInfoComponent__ParamController} ${Styles.BlogAddInfoComponent__ParamControllerStuff}`} htmlFor="stuff">Материал</label>
      </div>
      <div className={Styles.BlogAddInfoComponent__SortBlock}>
        <p className={Styles.BlogAddInfoComponent__SortDesc}>Сперва:</p>
        <input className={Styles.BlogAddInfoComponent__Field} type="checkbox" id="first" />
        <label className={Styles.BlogAddInfoComponent__SortController} htmlFor="first">Популярные</label>
      </div>
      <div className={Styles.BlogAddInfoComponent__Cards}>
        {
          data.map(item => (
            <div className={Styles.BlogAddInfoComponent__Card} key={item.id}>
              <BestProductCard item={item} />
            </div>
          ))
        }
      </div>
      <div className={Styles.BlogAddInfoComponent__AddElements}>
        <div className={Styles.BlogAddInfoComponent__Pagination}>
          <button className={Styles.BlogAddInfoComponent__PaginationArrowButton} type="button">
            <IconArrow className={Styles.BlogAddInfoComponent__PaginationArrowLeft} />
          </button>
          <button className={`${Styles.BlogAddInfoComponent__PaginationPageButton} ${Styles.BlogAddInfoComponent__PaginationPageButtonFirst}`} type="button">1</button>
          <button className={Styles.BlogAddInfoComponent__PaginationPageButton} type="button">2</button>
          <button className={Styles.BlogAddInfoComponent__PaginationPageButton} type="button">3</button>
          <button className={Styles.BlogAddInfoComponent__PaginationPageButton} type="button">4</button>
          <button className={Styles.BlogAddInfoComponent__PaginationPageButton} type="button">...</button>
          <button className={`${Styles.BlogAddInfoComponent__PaginationPageButton} ${Styles.BlogAddInfoComponent__PaginationPageButtonLast}`} type="button">8</button>
          <button className={Styles.BlogAddInfoComponent__PaginationArrowButton} type="button">
            <IconArrow className={Styles.BlogAddInfoComponent__PaginationArrowRight} />
          </button>
        </div>
        <button type="button" className={Styles.BlogAddInfoComponent__ShowMoreButton}>Показать ещё +25</button>
      </div>
    </div>
  </div>
);

export default BlogAddInfoComponent;
