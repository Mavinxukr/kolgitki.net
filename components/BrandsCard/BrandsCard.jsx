import React from 'react';
import PropTypes from 'prop-types';
import { parseText } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './BrandsCard.scss';
import Link from 'next/link';

const BrandsCard = ({ item }) => {
  return (
    <article className={styles.brandCard}>
      {item.image_link && (
        <div className={styles.imageWrapper}>
          <img src={item.image_link} className={styles.image} alt="logo" />
        </div>
      )}
      <p className={styles.name}>
        {parseText(cookies, item.name, item.name_ua)}
      </p>
      {item.categories && (
        <ul className={styles.list}>
          {item.categories.map((category, id) => (
            <li className={styles.listItem} key={id}>
              <Link prefetch={false} href={`/brands/${item.slug}`}>
                <a className={styles.listLink}>
                  {parseText(cookies, category.name, category.name_ua)}
                </a>
              </Link>
            </li>
          ))}
        </ul>
      )}
      <Link prefetch={false} href={`/brands/${item.slug}`}>
        <a className={styles.link}>
          {parseText(cookies, 'Все товары', 'Всі товари')}
        </a>
      </Link>
    </article>
  );
};

BrandsCard.propTypes = {
  item: PropTypes.shape({
    image_link: PropTypes.string,
    name: PropTypes.string,
    name_ua: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number
  })
};

export default BrandsCard;
