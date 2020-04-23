import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Loader from '../../../Loader/Loader';
import { getAllCategories } from '../../../../services/home';
import { withResponse } from '../../../hoc/withResponse';
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

const SiteMap = ({ isMobileScreen }) => {
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

        const classNameForHeader = cx(styles.itemHeader, {
          [styles.itemHeaderWithoutHeight]: isMobileScreen && !item.mainTitle,
        });

        return (
          <div className={styles.item}>
            <div className={classNameForHeader}>
              {item.mainTitle && <h3 className={styles.titleMain}>{item.mainTitle.name}</h3>}
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
                    <a className={styles.titleItem}>{item.title.name}</a>
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
          <h3 className={styles.titleMain}>Клиентам</h3>
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
          <h3 className={styles.titleMain}>Опт</h3>
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
          <h3 className={styles.titleMain}>О нас</h3>
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

SiteMap.propTypes = {
  isMobileScreen: PropTypes.bool,
};

export default withResponse(SiteMap);
