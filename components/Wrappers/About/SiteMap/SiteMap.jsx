import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import Loader from '../../../Loader/Loader';
import { getAllCategories } from '../../../../services/home';
import { withResponse } from '../../../hoc/withResponse';
import {
  setFiltersInCookies,
  createCleanUrl,
  parseText,
} from '../../../../utils/helpers';
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

  let counter = 0;

  useEffect(() => {
    getAllCategories({}).then(response => setCategories(response.data));
  }, []);

  const router = useRouter();

  if (!categories) {
    return <Loader isSmallPage />;
  }

  return (
    <div className={styles.siteMap}>
      {createArrForSiteMap(categories).map((item, index, arr) => {
        if (index + 1 !== arr.length && arr[index + 1].mainTitle) {
          counter = 0;
        } else {
          counter += 1;
        }
        const classNameForHeader = cx(
          styles.itemHeader,
          {
            [styles.itemHeaderWithoutHeight]:
              isMobileScreenForSiteMap && !item.mainTitle,
          },
          {
            [styles.noTitle]: !item.mainTitle,
          },
        );

        return (
          <div
            className={cx(styles.item, {
              [styles.itemLeftBorder]: item.mainTitle,
              [styles.itemBottomBorder]: counter !== 0 && counter % 2 === 0,
            })}
          >
            <div className={classNameForHeader}>
              {item.mainTitle && (
                <h3 className={styles.titleMain}>
                  {parseText(
                    cookies,
                    item.mainTitle.name,
                    item.mainTitle.name_ua,
                  )}
                </h3>
              )}
            </div>
            <div className={cx(styles.lists, {
              [styles.listsWithoutBorder]: item.mainTitle,
            })}
            >
              <div>
                {item.title && (
                  <a
                    href="/"
                    className={styles.titleItem}
                    onClick={(e) => {
                      e.preventDefault();
                      setFiltersInCookies(cookies, {
                        categories: [
                          {
                            id: item.title.id,
                            name: item.title.slug,
                            categoryName: parseText(
                              cookies,
                              item.name,
                              item.name_ua,
                            ),
                          },
                        ],
                      });
                      router.push(
                        '/Products',
                        `/Products/${createCleanUrl(cookies).join('/')}`,
                      );
                    }}
                  >
                    {parseText(cookies, item.title.name, item.title.name_ua)}
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
                            categories: [
                              {
                                id: itemChild.id,
                                name: itemChild.slug,
                                categoryName: parseText(
                                  cookies,
                                  item.name,
                                  item.name_ua,
                                ),
                              },
                            ],
                          });
                          router.push(
                            '/Products',
                            `/Products/${createCleanUrl(cookies).join('/')}`,
                          );
                        }}
                        className={styles.listsItemLink}
                      >
                        {parseText(cookies, itemChild.name, itemChild.name_ua)}
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
          <h3 className={styles.titleMain}>
            {parseText(cookies, 'Клиентам', 'Клієнтам')}
          </h3>
        </div>
        <div className={cx(styles.lists, styles.listsSimple)}>
          <MapItem
            arrOfLinks={[
              {
                id: 1,
                pathname: '/info/advantages',
                name: parseText(cookies, 'Преимущества', 'Переваги'),
              },
              {
                id: 2,
                pathname: '/info/questions',
                name: parseText(cookies, 'Доставка/Оплата', 'Доставка/Оплата'),
              },
              {
                id: 3,
                pathname: '/info/recovery',
                name: parseText(cookies, 'Возврат/Обмен', 'Повернення/Обмін'),
              },
              {
                id: 4,
                pathname: '/info/advantages',
                name: parseText(cookies, 'Вопросы/Ответы', 'Питання/Відповіді'),
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
                name: parseText(
                  cookies,
                  'Общая информация',
                  'Загальна інформація',
                ),
              },
              {
                id: 2,
                pathname: '/opt',
                name: parseText(cookies, 'Скачать .pdf', 'Завантажити .pdf'),
              },
            ]}
          />
        </div>
      </div>
      <div className={cx(styles.item, styles.itemSimple)}>
        <div className={styles.itemHeader}>
          <h3 className={styles.titleMain}>
            {parseText(cookies, 'О нас', 'Про нас')}
          </h3>
        </div>
        <div className={cx(styles.lists, styles.listsSimple)}>
          <MapItem
            arrOfLinks={[
              {
                id: 1,
                pathname: '/about/contacts',
                name: parseText(cookies, 'Контакты', 'Контакти'),
              },
              {
                id: 2,
                pathname: '/about/about',
                name: parseText(cookies, 'О магазине', 'Про магазин'),
              },
              {
                id: 3,
                pathname: '/about/careers',
                name: parseText(cookies, 'Вакансии', 'Вакансії'),
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
