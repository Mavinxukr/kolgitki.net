import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './BreadCrumbs.scss';
import Link from 'next/link';

const BreadCrumbs = ({ items }) => {
  let pathname = '';
  return (
    <>
      <div className={styles.breadCrumbs}>
        {items.map((item, index) => {
          pathname += item.pathname;
          return (
            <React.Fragment key={item.id + item.name}>
              {index !== items.length - 1 ? (
                <Link href={pathname} key={item.id}>
                  <a className={styles.link}>
                    {parseText(cookies, item.name, item.nameUa)}
                  </a>
                </Link>
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
