import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './BrandsCard.scss';

const BrandsCard = ({ item }) => (
  <article className={styles.brandCard}>
    {item.image_link && <img src={item.image_link} alt="logo" />}
    <p className={styles.name}>{item.name}</p>
    {item.description && (
    <ul className={styles.list}>
      {
            item.description.map((itemDesc, id) => <li className={styles.listItem} key={id}>{itemDesc}</li>)
          }
    </ul>
    )}
    <Link
      href={{
        pathname: `/Brands/${item.slug}`,
        query: {
          slug: item.slug,
          brands: [item.id],
          sort_popular: 'desc',
        },
      }}
      prefetch={false}
    >
      <a className={styles.link}>Все товары</a>
    </Link>
  </article>
);

BrandsCard.propTypes = {
  item: PropTypes.shape({
    image_link: PropTypes.string,
    name: PropTypes.string,
    slug: PropTypes.string,
    description: PropTypes.arrayOf(PropTypes.object),
    id: PropTypes.number,
  }),
};

export default BrandsCard;
