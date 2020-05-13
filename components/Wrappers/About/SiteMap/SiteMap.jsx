import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Loader from '../../../Loader/Loader';
import { getAllCategories } from '../../../../services/home';
import { withResponse } from '../../../hoc/withResponse';
import { setFiltersInCookies } from '../../../../utils/helpers';
import { cookies } from '../../../../utils/getCookies';
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

const SiteMap = ({ isMobileScreenForSiteMap }) => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    getAllCategories({}).then(response => setCategories(response.data));
  }, []);

  const router = useRouter();

  if (!categories) {
    return <Loader isSmallPage />;
  }

  return (
    <div className={styles.siteMap}>
      {createArrForSiteMap(categories).map((item) => {
        const classNameForHeader = cx(styles.itemHeader, {
          [styles.itemHeaderWithoutHeight]: isMobileScreenForSiteMap && !item.mainTitle,
        });

        return (
          <div className={styles.item}>
            <div className={classNameForHeader}>
              {item.mainTitle && <h3 className={styles.titleMain}>{item.mainTitle.name}</h3>}
            </div>
            <div className={styles.lists}>
              <div>
                {item.title && (
                <a
                  href="/"
                  className={styles.titleItem}
                  onClick={(e) => {
                    e.preventDefault();
                    setFiltersInCookies(cookies, {
                      categories: [{
                        id: item.title.id,
                        name: item.title.slug,
                      }],
                    });
                    router.push('/Products');
                  }}
                >{item.title.name}
                </a>
                )}
                <ul className={styles.listsItemLinks}>
                  {item.subCategories.map(itemChild => (
                    <li className={styles.listsItemLinkWrapper} key={item.id}>
                      <a
                        href="/"
                        onClick={(e) => {
                          e.preventDefault();
                          setFiltersInCookies(cookies, {
                            categories: [{
                              id: itemChild.id,
                              name: itemChild.slug,
                            }],
                          });
                          router.push('/Products');
                        }}
                        className={styles.listsItemLink}
                      >
                        {itemChild.name}
                      </a>
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
  isMobileScreenForSiteMap: PropTypes.bool,
};

export default withResponse(SiteMap);
