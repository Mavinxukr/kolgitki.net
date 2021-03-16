import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './BreadCrumbs.scss';
import { ProductsContext } from '../../../context/ProductsContext';

const BreadCrumbs = ({ items }) => {
  let pathname = '';
  const { clearProductsFilters } = useContext(ProductsContext);
  return (
    <>
      <div className={styles.breadCrumbs}>
        {items.map((item, index) => {
          pathname += item.pathname;
          return (
            <React.Fragment key={item.id + item.name}>
              {index !== items.length - 1 ? (
                <a
                  href={pathname}
                  onClick={() => {
                    clearProductsFilters(['search']);
                  }}
                  className={styles.link}
                  key={item.id}
                >
                  {parseText(cookies, item.name, item.nameUa)}
                </a>
              ) : (
                <p key={item.id} className={styles.link}>
                  {parseText(cookies, item.name, item.nameUa)}
                </p>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </>
  );
};

BreadCrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  routerName: PropTypes.string,
  isGift: PropTypes.bool
};

export default BreadCrumbs;
