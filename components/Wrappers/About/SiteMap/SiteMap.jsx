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
  parseText
} from '../../../../utils/helpers';
import { cookies } from '../../../../utils/getCookies';
import styles from './SiteMap.scss';

const createArrForSiteMap = categories => {
  const arr = [];
  categories.forEach(item => {
    const newItem = item.subcategory.map((itemChild, index) => {
      if (index === 0) {
        return {
          mainTitle: item,
          title: itemChild,
          subCategories: itemChild.subcategory
        };
      }
      return {
        title: itemChild,
        subCategories: itemChild.subcategory
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
    if (JSON.parse(localStorage.getItem('getAllCategories'))) {
      setCategories(JSON.parse(localStorage.getItem('getAllCategories')));
    } else {
      getAllCategories({}).then(response => {
        setCategories(response.data);
        localStorage.setItem('getAllCategories', JSON.stringify(response.data));
      });
    }
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
              isMobileScreenForSiteMap && !item.mainTitle
          },
          {
            [styles.noTitle]: !item.mainTitle
          }
        );

        return (
          !!item.subCategories.length && (
            <div
              key={`sitemap-${index}`}
              className={cx(styles.item, {
                [styles.itemLeftBorder]: item.mainTitle,
                [styles.itemBottomBorder]: counter !== 0 && counter % 2 === 0
              })}
            >
              <div className={classNameForHeader}>
                {item.mainTitle && (
                  <h3>
                    {parseText(
                      cookies,
                      item.mainTitle?.name,
                      item.mainTitle?.name_ua
                    )}
                  </h3>
                )}
              </div>
              <div
                className={cx(styles.lists, {
                  [styles.listsWithoutBorder]: item.mainTitle
                })}
              >
                <div>
                  {item.mainTitle && item.title && (
                    <a
                      href="/"
                      className={styles.titleItem}
                      onClick={e => {
                        e.preventDefault();
                        setFiltersInCookies(cookies, {
                          categories: [
                            {
                              id: item.mainTitle.id,
                              name: item.mainTitle.slug,
                              categoryName: parseText(
                                cookies,
                                item.mainTitle?.name,
                                item.mainTitle?.name_ua
                              )
                            },
                            {
                              id: item.title.id,
                              name: item.title.slug,
                              categoryName: parseText(
                                cookies,
                                item.title?.name,
                                item.title?.name_ua
                              )
                            }
                          ]
                        });
                        router.push(
                          '/products',
                          `/products/${createCleanUrl(cookies).join('/')}`
                        );
                      }}
                    >
                      {parseText(
                        cookies,
                        item.title?.name,
                        item.title?.name_ua
                      )}
                    </a>
                  )}
                  <ul className={styles.listsItemLinks}>
                    {item.subCategories.map(itemChild => {
                      console.log(itemChild);
                      return (
                        <li
                          className={styles.listsItemLinkWrapper}
                          key={itemChild.id}
                        >
                          <a
                            href={`/products/${itemChild.crumbs}`}
                            // onClick={e => {
                            //   e.preventDefault();
                            //   if (!item.mainTitle) {
                            //     if (itemChild.parent_slug === 'zhenshinam') {
                            //       setFiltersInCookies(cookies, {
                            //         categories: [
                            //           {
                            //             id: 1,
                            //             name: itemChild.parent_slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               'Женщинам',
                            //               'Жінкам'
                            //             )
                            //           },
                            //           {
                            //             id: item.title.id,
                            //             name: item.title.slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               item.title.name,
                            //               item.title.name_ua
                            //             )
                            //           },
                            //           {
                            //             id: itemChild.id,
                            //             name: itemChild.slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               itemChild.name,
                            //               itemChild.name_ua
                            //             )
                            //           }
                            //         ]
                            //       });
                            //     }
                            //     if (itemChild.parent_slug === 'detyam') {
                            //       setFiltersInCookies(cookies, {
                            //         categories: [
                            //           {
                            //             id: 3,
                            //             name: itemChild.parent_slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               'Детям',
                            //               'Дітям'
                            //             )
                            //           },
                            //           {
                            //             id: item.title.id,
                            //             name: item.title.slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               item.title.name,
                            //               item.title.name_ua
                            //             )
                            //           },
                            //           {
                            //             id: itemChild.id,
                            //             name: itemChild.slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               itemChild.name,
                            //               itemChild.name_ua
                            //             )
                            //           }
                            //         ]
                            //       });
                            //     }
                            //     if (itemChild.parent_slug === 'muzhchinam') {
                            //       setFiltersInCookies(cookies, {
                            //         categories: [
                            //           {
                            //             id: 2,
                            //             name: itemChild.parent_slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               'Мужчинам',
                            //               'Чоловікам'
                            //             )
                            //           },
                            //           {
                            //             id: item.title.id,
                            //             name: item.title.slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               item.title.name,
                            //               item.title.name_ua
                            //             )
                            //           },
                            //           {
                            //             id: itemChild.id,
                            //             name: itemChild.slug,
                            //             categoryName: parseText(
                            //               cookies,
                            //               itemChild.name,
                            //               itemChild.name_ua
                            //             )
                            //           }
                            //         ]
                            //       });
                            //     }
                            //     router.push(
                            //       '/products',
                            //       `/products/${createCleanUrl(cookies).join(
                            //         '/'
                            //       )}`
                            //     );
                            //     return;
                            //   }
                            //   setFiltersInCookies(cookies, {
                            //     categories: [
                            //       {
                            //         id: item.mainTitle.id,
                            //         name: item.mainTitle.slug,
                            //         categoryName: parseText(
                            //           cookies,
                            //           item.mainTitle.name,
                            //           item.mainTitle.name_ua
                            //         )
                            //       },
                            //       {
                            //         id: item.title.id,
                            //         name: item.title.slug,
                            //         categoryName: parseText(
                            //           cookies,
                            //           item.title.name,
                            //           item.title.name_ua
                            //         )
                            //       },
                            //       {
                            //         id: itemChild.id,
                            //         name: itemChild.slug,
                            //         categoryName: parseText(
                            //           cookies,
                            //           itemChild.name,
                            //           itemChild.name_ua
                            //         )
                            //       }
                            //     ]
                            //   });
                            //   router.push(
                            //     '/products',
                            //     `/products/${createCleanUrl(cookies).join('/')}`
                            //   );
                            // }}
                            className={styles.listsItemLink}
                          >
                            {parseText(
                              cookies,
                              itemChild.name,
                              itemChild.name_ua
                            )}
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          )
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
                name: parseText(cookies, 'Преимущества', 'Переваги')
              },
              {
                id: 2,
                pathname: '/info/questions',
                name: parseText(cookies, 'Доставка/Оплата', 'Доставка/Оплата')
              },
              {
                id: 3,
                pathname: '/info/recovery',
                name: parseText(cookies, 'Возврат/Обмен', 'Повернення/Обмін')
              },
              {
                id: 4,
                pathname: '/info/advantages',
                name: parseText(cookies, 'Вопросы/Ответы', 'Питання/Відповіді')
              },
              {
                id: 5,
                pathname: '/brands',
                name: parseText(cookies, 'Бренды', 'Бренди')
              },
              {
                id: 6,
                pathname: '/gift-backets',
                name: parseText(
                  cookies,
                  'Подарочные наборы',
                  'Подарунковий набiр'
                )
              }
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
                  'Загальна інформація'
                )
              },
              {
                id: 2,
                pathname: '/opt',
                name: parseText(cookies, 'Скачать .pdf', 'Завантажити .pdf')
              }
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
                name: parseText(cookies, 'Контакты', 'Контакти')
              },
              {
                id: 2,
                pathname: '/about/about',
                name: parseText(cookies, 'О магазине', 'Про магазин')
              },
              {
                id: 3,
                pathname: '/about/careers',
                name: parseText(cookies, 'Вакансии', 'Вакансії')
              },
              {
                id: 4,
                pathname: '/blog',
                name: parseText(cookies, 'Новости', 'Новини')
              }
            ]}
          />
        </div>
      </div>
    </div>
  );
};

MapItem.propTypes = {
  arrOfLinks: PropTypes.arrayOf(PropTypes.object)
};

SiteMap.propTypes = {
  isMobileScreenForSiteMap: PropTypes.bool
};

export default withResponse(SiteMap);
