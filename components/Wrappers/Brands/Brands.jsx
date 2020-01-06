import React from 'react';
import styles from './Brands.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import BrandsCard from '../../BrandsCard/BrandsCard';
import { data } from './data';

const Brands = () => {
  const getAlphabet = (startSymbol, endSymbol) => {
    const alphabet = [];
    for (let i = startSymbol; i <= endSymbol; i += 1) {
      alphabet.push(<span className={styles.brandsFiltersItemLetter}>{String.fromCharCode(i)}</span>);
    }
    return alphabet;
  };

  return (
    <MainLayout>
      <div className={styles.content}>
        <BreadCrumbs value={['Главная', '/ Бренды']} />
        <div className={styles.brandsFilters}>
          <h2 className={styles.brandsFiltersTitle}>Бренды</h2>
          <div className={styles.brandsFiltersItems}>
            <span className={styles.brandsFiltersItem}>Все</span>
            <span className={styles.brandsFiltersItem}>0-9</span>
            <div className={styles.brandsFiltersItemLetters}>
              {
                getAlphabet(65, 90).map(item => item)
              }
            </div>
            <div className={styles.brandsFiltersItemLetters}>
              {
                getAlphabet(1040, 1071).map(item => item)
              }
            </div>
          </div>
        </div>
        <div className={styles.brandsList}>
          {
            data.map(item => (
              <div className={styles.brandsListContent}>
                <p className={styles.brandsListLetter}>{item.letter}</p>
                <div className={styles.brandsListCards}>
                  {
                    item.foundBrands.map(itemBrand => <BrandsCard key={item.idBrand} item={itemBrand} />)
                  }
                </div>
              </div>
            ))
          }
        </div>
        <div className={styles.textWrapper}>
          <h5>Чтобы оформить возврат, нужно сделать 3 шага:</h5>
          <p className={styles.text}>
            На протяжении веков украинский народ развивал собственное
            музыкально искусство, театр и живопись. Некоторые украинские
            художники и их шедев известны не только в Украине, но и во всем мире.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Brands;
