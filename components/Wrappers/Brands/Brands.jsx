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
import Loader from '../../Loader/Loader';

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

const sortBrands = brands => {
  return _.sortBy(
    _.values(_.groupBy(brands, item => item.name[0])),
    item => item[0].name[0]
  );
};

const Brands = ({ brands: serverBrands, isDesktopScreen }) => {
  const [brands, setBrands] = useState(
    serverBrands.map(item => ({
      ...item.brand,
      categories: item.categories
    }))
  );
  const [updateData, setUpdateData] = useState(false);
  const router = useRouter();

  async function loadBrands() {
    const filters = {};
    if (router.query.hasOwnProperty('char')) {
      filters.char = router.query.char;
    }
    const response = await getBrandsData(filters);
    if (response.status) {
      setBrands(
        response.data.map(item => ({
          ...item.brand,
          categories: item.categories
        }))
      );
    }
  }
  useEffect(() => {
    if (brands.length < 1) {
      loadBrands();
    }
    if (serverBrands) {
      setBrands(
        serverBrands.map(item => ({
          ...item.brand,
          categories: item.categories
        }))
      );
    }
  }, []);

  useEffect(() => {
    if (updateData) {
      loadBrands();
    } else {
      setUpdateData(true);
    }
  }, [router.query]);

  if (!brands) {
    return <Loader></Loader>;
  }

  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.brandsMainInfo}>
          <div className={styles.startMain}>
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
            <h4 className={styles.brandsFiltersTitle}>
              {parseText(cookies, 'Бренды', 'Бренди')}
            </h4>
          </div>
          <div className={styles.endMain}>
            <span className={styles.brandCount}>{brands.length} всего</span>
          </div>
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
              {getAlphabet(65, 90).map(item => {
                const classNameForButton = cx(styles.brandsFiltersItemLetter, {
                  [styles.brandsFiltersItemLetterActive]:
                    router.query.char === item
                });

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
