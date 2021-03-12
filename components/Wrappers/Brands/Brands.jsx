import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cx from 'classnames';
import _ from 'lodash';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import styles from './Brands.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import { getBrandsData } from '../../../services/brands';
import { withResponse } from '../../hoc/withResponse';
import BrandsCard from '../../BrandsCard/BrandsCard';

const getAlphabet = (startSymbol, endSymbol) => {
  const alphabet = [];
  for (let i = startSymbol; i <= endSymbol; i += 1) {
    alphabet.push(String.fromCharCode(i));
  }
  return alphabet;
};

const ukraineAlphabet = [
  'А',
  'Б',
  'В',
  'Г',
  'Ґ',
  'Д',
  'Е',
  'Є',
  'Ж',
  'З',
  'И',
  'І',
  'Ї',
  'Й',
  'К',
  'Л',
  'М',
  'Н',
  'О',
  'П',
  'Р',
  'С',
  'Т',
  'У',
  'Ф',
  'Х',
  'Ц',
  'Ч',
  'Ш',
  'Щ',
  'Ь',
  'Ю',
  'Я'
];

const sortBrands = brands =>
  _.sortBy(
    _.values(_.groupBy(brands, item => item.name[0])),
    item => item[0].name[0]
  );

const Brands = ({ brandsData, isDesktopScreen }) => {
  const [brands, setBrands] = useState(
    brandsData.map(item => ({
      ...item.brand,
      categories: item.categories
    }))
  );

  const router = useRouter();

  // useEffect(() => {
  //   getBrandsData({ char: router.query.char || '' }).then(response =>
  //     setBrands(
  //       response.data.map(item => ({
  //         ...item.brand,
  //         categories: item.categories
  //       }))
  //     )
  //   );
  // }, [router.query]);

  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.brandsMainInfo}>
          <BreadCrumbs
            items={[
              {
                id: 1,
                name: 'Главная',
                nameUa: 'Головна',
                pathname: '/'
              },
              {
                id: 2,
                name: 'Бренды',
                nameUa: 'Бренди'
              }
            ]}
          />
        </div>
        <div className={styles.brandsFilters}>
          <h4 className={styles.brandsFiltersTitle}>
            {parseText(cookies, 'Бренды', 'Бренди')}
          </h4>
          <div className={styles.brandsFiltersItems}>
            <div className={styles.filterGroup}>
              <button
                type="button"
                onClick={() => {
                  router.push('/brands');
                }}
                className={cx(styles.brandsFiltersItem, {
                  [styles.brandsFiltersItemLetterActive]: !router.query.char
                })}
              >
                {parseText(cookies, 'Все', 'Всі')}
              </button>
              <button
                type="button"
                onClick={() => {
                  router.push({
                    pathname: '/brands',
                    query: {
                      char: 1
                    }
                  });
                }}
                className={cx(styles.brandsFiltersItem, {
                  [styles.brandsFiltersItemLetterActive]:
                    router.query.char === '1'
                })}
              >
                0-9
              </button>
              {(isDesktopScreen && (
                <div className={styles.brandsFiltersItemLetters}>
                  {getAlphabet(65, 90).map(item => {
                    const classNameForButton = cx(
                      styles.brandsFiltersItemLetter,
                      {
                        [styles.brandsFiltersItemLetterActive]:
                          router.query.char === item
                      }
                    );

                    return (
                      <button
                        type="button"
                        className={classNameForButton}
                        key={item}
                        onClick={() => {
                          router.push({
                            pathname: '/brands',
                            query: {
                              char: item
                            }
                          });
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </div>
              )) || (
                <>
                  {getAlphabet(65, 90).map(item => {
                    const classNameForButton = cx(
                      styles.brandsFiltersItemLetter,
                      {
                        [styles.brandsFiltersItemLetterActive]:
                          router.query.char === item
                      }
                    );

                    return (
                      <button
                        type="button"
                        className={classNameForButton}
                        key={item}
                        onClick={() => {
                          router.push({
                            pathname: '/brands',
                            query: {
                              char: item
                            }
                          });
                        }}
                      >
                        {item}
                      </button>
                    );
                  })}
                </>
              )}
            </div>
            {!isDesktopScreen && <hr className={styles.line} />}
            <div className={styles.brandsFiltersItemLetters}>
              {parseText(cookies, getAlphabet(1040, 1071), ukraineAlphabet).map(
                item => {
                  const classNameForButton = cx(
                    styles.brandsFiltersItemLetter,
                    {
                      [styles.brandsFiltersItemLetterActive]:
                        router.query.char === item
                    }
                  );

                  return (
                    <button
                      type="button"
                      className={classNameForButton}
                      key={item}
                      onClick={() => {
                        router.push({
                          pathname: '/brands',
                          query: {
                            char: item
                          }
                        });
                      }}
                    >
                      {item}
                    </button>
                  );
                }
              )}
            </div>
          </div>
        </div>
        {(brands.length && (
          <div className={styles.brandsList}>
            {sortBrands(brands).map(item => (
              <div className={styles.brandsListContent} key={item[0].id}>
                <p className={styles.brandsListLetter}>
                  {parseText(
                    cookies,
                    item[0].name[0].toUpperCase(),
                    item[0].name_ua[0].toUpperCase()
                  )}
                </p>
                <div className={styles.brandsListCards}>
                  {item.map(itemBrand => (
                    <BrandsCard
                      key={itemBrand.id}
                      item={itemBrand}
                      router={router}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )) || (
          <p className={styles.notFoundText}>
            {parseText(
              cookies,
              'брендов по запросу не найдено',
              'брендів не знайдено'
            )}
          </p>
        )}
        <div className={styles.textWrapper}>
          <h5 className={styles.textTitle}>
            {parseText(
              cookies,
              'Чтобы оформить возврат, нужно сделать 3 шага:',
              'Щоб оформити повернення товару, потрібно зробити 3 кроки:'
            )}
          </h5>
          <p className={styles.text}>
            {parseText(
              cookies,
              `На протяжении веков украинский народ развивал собственное музыкально
            искусство, театр и живопись. Некоторые украинские художники и их
            шедев известны не только в Украине, но и во всем мире.`,
              `Протягом століть український народ розвивав власну музику, театр і живопис. Деякі українські художники і їх
             шедеври відомі не тільки в Україні, а й в усьому світі.`
            )}
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

Brands.propTypes = {
  brandsData: PropTypes.arrayOf(PropTypes.object),
  isDesktopScreen: PropTypes.bool
};

export default withResponse(Brands);
