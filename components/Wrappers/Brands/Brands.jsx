import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import _ from 'lodash';
import styles from './Brands.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import { getBrandsData } from '../../../services/brands';
import BrandsCard from '../../BrandsCard/BrandsCard';

const getAlphabet = (startSymbol, endSymbol) => {
  const alphabet = [];
  for (let i = startSymbol; i <= endSymbol; i += 1) {
    alphabet.push(String.fromCharCode(i));
  }
  return alphabet;
};

const sortBrands = brands => _.sortBy(
  _.values(_.groupBy(brands, item => item.name[0])),
  item => item[0].name[0],
);

const Brands = ({ brandsData }) => {
  const [brands, setBrands] = useState(brandsData);

  const router = useRouter();

  useEffect(() => {
    getBrandsData({ char: router.query.char || '' }).then(response => setBrands(response.data));
  }, [router.query]);

  return (
    <MainLayout>
      <div className={styles.content}>
        <div className={styles.brandsMainInfo}>
          <BreadCrumbs
            items={[
              {
                id: 1,
                name: 'Главная',
                pathname: '/',
              },
              {
                id: 2,
                name: 'Бренды',
              },
            ]}
          />
          <div>{brands.length} Брендов всего</div>
        </div>
        <div className={styles.brandsFilters}>
          <h4 className={styles.brandsFiltersTitle}>Бренды</h4>
          <div className={styles.brandsFiltersItems}>
            <button
              type="button"
              onClick={() => {
                router.push('/Brands');
              }}
              className={styles.brandsFiltersItem}
            >
              Все
            </button>
            <button
              type="button"
              onClick={() => {
                router.push({
                  pathname: '/Brands',
                  query: {
                    char: 1,
                  },
                });
              }}
              className={styles.brandsFiltersItem}
            >
              0-9
            </button>
            <div className={styles.brandsFiltersItemLetters}>
              {getAlphabet(65, 90).map(item => (
                <button
                  type="button"
                  className={styles.brandsFiltersItemLetter}
                  key={item}
                  onClick={() => {
                    router.push({
                      pathname: '/Brands',
                      query: {
                        char: item,
                      },
                    });
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className={styles.brandsFiltersItemLetters}>
              {getAlphabet(1040, 1071).map(item => (
                <button
                  type="button"
                  className={styles.brandsFiltersItemLetter}
                  key={item}
                  onClick={() => {
                    router.push({
                      pathname: '/Brands',
                      query: {
                        char: item,
                      },
                    });
                  }}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.brandsList}>
          {sortBrands(brands).map(item => (
            <div className={styles.brandsListContent} key={item[0].id}>
              <p className={styles.brandsListLetter}>
                {item[0].name[0].toUpperCase()}
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
        <div className={styles.textWrapper}>
          <h5 className={styles.textTitle}>
            Чтобы оформить возврат, нужно сделать 3 шага:
          </h5>
          <p className={styles.text}>
            На протяжении веков украинский народ развивал собственное музыкально
            искусство, театр и живопись. Некоторые украинские художники и их
            шедев известны не только в Украине, но и во всем мире.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

Brands.propTypes = {
  brandsData: PropTypes.arrayOf(PropTypes.object),
};

export default Brands;
