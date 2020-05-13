import React from 'react';
import PropTypes from 'prop-types';
import { setFiltersInCookies, createCleanUrl } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './BrandsCard.scss';

const BrandsCard = ({ item, router }) => (
  <article className={styles.brandCard}>
    {item.image_link && <img src={item.image_link} alt="logo" />}
    <p className={styles.name}>{item.name}</p>
    {item.description && (
      <ul className={styles.list}>
        {item.description.map((itemDesc, id) => (
          <li className={styles.listItem} key={id}>
            {itemDesc}
          </li>
        ))}
      </ul>
    )}
    <a
      href="/"
      className={styles.link}
      onClick={(e) => {
        e.preventDefault();
        setFiltersInCookies(cookies, {
          brands: [{
            id: item.id,
            name: item.name,
          }],
        });
        router.push({
          pathname: '/Brands/[bid]',
          query: {
            brand_id: item.id,
          },
        }, `/Brands/${item.id}_${createCleanUrl(cookies).join('_')}`);
      }}
    >
      Все товары
    </a>
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
  router: PropTypes.object,
};

export default BrandsCard;
