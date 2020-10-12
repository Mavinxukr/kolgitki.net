import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = ({ items }) => (
  <>
    <div className={styles.breadCrumbs}>
      {items.map((item, index) => (
        <>
          {index !== items.length - 1 ? (
            <Link href={item.pathname} prefetch={false}>
              <a
                onClick={e => e.target.classList.add(styles.clicked)}
                className={styles.link}
                key={item.id}
              >
                {parseText(cookies, item.name, item.nameUa)}
              </a>
            </Link>
          ) : (
            <p key={item.id} className={styles.link}>
              {parseText(cookies, item.name, item.nameUa)}
            </p>
          )}
        </>
      ))}
    </div>
  </>
);

BreadCrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
};

export default BreadCrumbs;
