import React from 'react';
import styles from './ProductTitle.scss';
import { cookies } from '../../utils/getCookies';
import { getCorrectWordCount, parseText } from '../../utils/helpers';

export const ProductTitle = ({ categoryName, countGoods }) => {
  console.log(countGoods);
  return (
    <div className={styles.titleBlock}>
      <h1 className={styles.title}>
        {parseText(cookies, categoryName.name, categoryName.name_ua) ||
          'Каталог'}
      </h1>
      <p className={styles.goodsNumber}>
        {getCorrectWordCount(countGoods, ['товар', 'товара', 'товаров'])}
      </p>
    </div>
  );
};
