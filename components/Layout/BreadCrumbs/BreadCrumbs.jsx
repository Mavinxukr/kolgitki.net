import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = ({ items }) => (
  <>
    <div className={styles.breadCrumbs}>
      {items.map((item, index) => (
        <>
          {index !== items.length - 1 ? (
            <Link href={item.pathname} prefetch={false}>
              <a className={styles.link} key={item.id}>
                {index === 0 ? '' : '/'} {item.name}
              </a>
            </Link>
          ) : (
            <p key={item.id} className={styles.link}>/ {item.name}</p>
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
