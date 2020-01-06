import React, { useState } from 'react';
import styles from './Counter.scss';

const Counter = () => {
  const [countProducts, setCountProducts] = useState(0);

  return (
    <div className={styles.counterProducts}>
      <button
        onClick={() => setCountProducts(countProducts - 1)}
        className={styles.buttonChangeCount}
        type="button"
      >
        -
      </button>
      <p className={styles.countProductIndicator}>{countProducts}</p>
      <button
        onClick={() => setCountProducts(countProducts + 1)}
        className={styles.buttonChangeCount}
        type="button"
      >
        +
      </button>
    </div>
  );
};

export default Counter;
