import React, { useState } from 'react';
import styles from './ProductsList.scss';
import { CardProduct } from '../../../Layout/CardProduct/CardProduct';
import { Noresult } from '../Noresult/Noresult';
import ProductLoader from '../../../ProductLoader/ProductLoader';
import { useSelector } from 'react-redux';
import { userDataSelector } from '../../../../utils/selectors';
import { parseText } from '../../../../utils/helpers';
import { cookies } from '../../../../utils/getCookies';
import ProductForOpt from '../ProductForOpt';
import cx from 'classnames';

export const ProductsList = ({ products, loading }) => {
  const userData = useSelector(userDataSelector);
  const [withPhoto, ShowWithPhoto] = useState(false);

  return (
    <div className={styles.wrapper}>
      {loading && (
        <div className={styles.loader}>
          <ProductLoader />
        </div>
      )}
      {products && products.length > 0 ? (
        userData?.role?.id === 3 ? (
          <>
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
              {products.map(item => (
                <ProductForOpt
                  key={item.id + item.name}
                  item={item}
                  isToggled={false}
                  withPhoto={withPhoto}
                />
              ))}
            </div>
          </>
        ) : (
          <div className={styles.cards}>
            {products.map(item => (
              <CardProduct key={item.id} data={item} />
            ))}
          </div>
        )
      ) : (
        !loading && <Noresult />
      )}
    </div>
  );
};
