import React from 'react';
import styles from './BurgerButton.scss';
import cx from 'classnames';

export const BurgerButton = ({ isOpen, setOpening }) => {
  return (
    <div
      onClick={() => setOpening(!isOpen)}
      className={cx(styles.burger, {
        [styles.active]: isOpen
      })}
    ></div>
  );
};
