import React from 'react';
import PropTypes from 'prop-types';
import { setFiltersInCookies, createCleanUrl } from '../../utils/helpers';
import { cookies } from '../../utils/getCookies';
import styles from './BrandsCard.scss';

const BrandsCard = ({ item, router }) => (
  <article className={styles.brandCard}>
    {item.image_link && <img src={item.image_link} alt="logo" />}
    <p className={styles.name}>{item.name}</p>
    {item.categories && (
      <ul className={styles.list}>
        {item.categories.map((category, id) => (
          <li className={styles.listItem} key={id}>
            <a
              href="/"
              className={styles.listLink}
              onClick={(e) => {
                e.preventDefault();
                setFiltersInCookies(cookies, {
                  brands: [
                    {
                      id: item.id,
                      name: item.name,
                    },
                  ],
                  categories: [{
                    id: category.id,
                    name: category.slug,
                  }],
                });
                router.push(
                  '/Brands/[bid]',
                  `/Brands/${item.id}_${createCleanUrl(cookies).join('_')}`,
                );
              }}
            >{category.name}
            </a>
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
          brands: [
            {
              id: item.id,
              name: item.name,
            },
          ],
        });
        router.push(
          '/Brands/[bid]',
          `/Brands/${item.id}_${createCleanUrl(cookies).join('_')}`,
        );
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
    categories: PropTypes.arrayOf(PropTypes),
  }),
  router: PropTypes.object,
};

export default BrandsCard;
