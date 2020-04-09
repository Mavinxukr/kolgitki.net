import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Loader from '../../../Loader/Loader';
import { getAllCategories } from '../../../../services/home';
import styles from './SiteMap.scss';

const createArrForSiteMap = (categories) => {
  const arr = [];
  categories.forEach((item) => {
    const newItem = item.subcategory.map((itemChild, index) => {
      if (index === 0) {
        return {
          mainTitle: item,
          title: itemChild,
          subCategories: itemChild.subcategory,
        };
      }
      return {
        title: itemChild,
        subCategories: itemChild.subcategory,
      };
    });
    arr.push(...newItem);
  });
  return arr;
};

const MapItem = ({ arrOfLinks }) => (
  <ul className={styles.listsItemLinks}>
    {arrOfLinks.map(item => (
      <li className={styles.listsItemLinkWrapper} key={item.id}>
        <Link href={item.pathname} prefetch={false}>
          <a className={styles.listsItemLink} href="/">
            {item.name}
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

const SiteMap = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getAllCategories({}).then(response => setCategories(response.data));
  }, []);

  if (!categories) {
    return <Loader />;
  }

  return (
    <div className={styles.siteMap}>
      {createArrForSiteMap(categories).map((item) => {
        const classNameForList = cx(styles.lists, {
          [styles.listsShowHidden]: item.subCategories.length > 2,
        });

        return (
          <div className={styles.item}>
            <div className={styles.itemHeader}>
              {item.mainTitle && <h3>{item.mainTitle.name}</h3>}
            </div>
            <div className={classNameForList}>
              <div>
                {item.title && (
                  <Link
                    href={{
                      pathname: '/Products',
                      query: {
                        categories: [item.title.id],
                        sort_popular: 'desc',
                      },
                    }}
                    prefetch={false}
                  >
                    <a classNames={styles.titleItem}>{item.title.name}</a>
                  </Link>
                )}
                <ul className={styles.listsItemLinks}>
                  {item.subCategories.map(itemChild => (
                    <li className={styles.listsItemLinkWrapper} key={item.id}>
                      <Link
                        href={{
                          pathname: '/Products',
                          query: {
                            categories: [itemChild.id],
                            sort_popular: 'desc',
                          },
                        }}
                        prefetch={false}
                      >
                        <a className={styles.listsItemLink} href="/">
                          {itemChild.name}
                        </a>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );
      })}
      <div className={cx(styles.item, styles.itemSimple)}>
        <div className={styles.itemHeader}>
          <h3>Клиентам</h3>
        </div>
        <div className={cx(styles.lists, styles.listsSimple)}>
          <MapItem
            arrOfLinks={[
              {
                id: 1,
                pathname: '/info/advantages',
                name: 'Преимущества',
              },
              {
                id: 2,
                pathname: '/info/questions',
                name: 'Доставка/Оплата',
              },
              {
                id: 3,
                pathname: '/info/recovery',
                name: 'Возврат/Обмен',
              },
              {
                id: 4,
                pathname: '/info/advantages',
                name: 'Вопросы/Ответы',
              },
            ]}
          />
        </div>
      </div>
      <div className={cx(styles.item, styles.itemSimple)}>
        <div className={styles.itemHeader}>
          <h3>Опт</h3>
        </div>
        <div className={cx(styles.lists, styles.listsSimple)}>
          <MapItem
            arrOfLinks={[
              {
                id: 1,
                pathname: '/opt',
                name: 'Общая информация',
              },
              {
                id: 2,
                pathname: '/opt',
                name: 'Скачать .pdf',
              },
            ]}
          />
        </div>
      </div>
      <div className={cx(styles.item, styles.itemSimple)}>
        <div className={styles.itemHeader}>
          <h3>О нас</h3>
        </div>
        <div className={cx(styles.lists, styles.listsSimple)}>
          <MapItem
            arrOfLinks={[
              {
                id: 1,
                pathname: '/about/contacts',
                name: 'Контакты',
              },
              {
                id: 2,
                pathname: '/about/about',
                name: 'О магазине',
              },
              {
                id: 3,
                pathname: '/about/careers',
                name: 'Вакансии',
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
};

MapItem.propTypes = {
  arrOfLinks: PropTypes.arrayOf(PropTypes.object),
};

export default SiteMap;
