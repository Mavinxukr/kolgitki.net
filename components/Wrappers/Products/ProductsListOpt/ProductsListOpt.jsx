import React, { useState } from 'react';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import cx from 'classnames';
import ProductForOpt from '../ProductForOpt';
import styles from './ProductsListOpt.scss';

export const ProductsListOpt = ({ products }) => {
  console.log(products);
  const [withPhoto, ShowWithPhoto] = useState(false);

  return (
    <div>
      <div className={styles.relative}>
        <button
          type="button"
          className={cx(styles.withPhoto, {
            [styles.checked]: withPhoto
          })}
          onClick={() => ShowWithPhoto(!withPhoto)}
        >
          {parseText(cookies, 'Показать с фото', 'Показати з фото')}
        </button>
      </div>
      <div uk-accordion="multiple: false">
        {products?.map(item => (
          <ProductForOpt
            key={item.id + item.name}
            item={item}
            isToggled={false}
            withPhoto={withPhoto}
          />
        ))}
      </div>
    </div>
  );
};
