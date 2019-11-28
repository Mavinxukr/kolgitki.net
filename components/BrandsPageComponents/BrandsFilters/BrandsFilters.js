import React from 'react';
import Styles from './BrandsFilters.module.scss';

const BrandsFilters = () => {
  const getAlphabet = (startSymbol, endSymbol) => {
    const alphabet = [];
    for (let i = startSymbol; i <= endSymbol; i += 1) {
      alphabet.push(<span className={Styles.BrandsFilters__ItemLetter}>{String.fromCharCode(i)}</span>);
    }
    return alphabet;
  };

  return (
    <div className={Styles.BrandsFilters}>
      <h2 className={Styles.BrandsFilters__Title}>Бренды</h2>
      <div className={Styles.BrandsFilters__FiltersItems}>
        <span className={Styles.BrandsFilters__Item}>Все</span>
        <span className={Styles.BrandsFilters__Item}>0-9</span>
        <div className={Styles.BrandsFilters__ItemLetters}>
          {
            getAlphabet(65, 90).map(item => item)
          }
        </div>
        <div className={Styles.BrandsFilters__ItemLetters}>
          {
            getAlphabet(1040, 1071).map(item => item)
          }
        </div>
      </div>
    </div>
  );
};

export default BrandsFilters;
