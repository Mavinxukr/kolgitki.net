import React from 'react';
import cx from 'classnames';
import styles from './Button.scss';

const Button = ({
  title, viewType, buttonType, width,
}) => {
  const classNameForButton = cx(styles.button, {
    [styles.blackButton]: viewType === 'black',
    [styles.whiteButton]: viewType === 'white',
    [styles.redButton]: viewType === 'red',
    [styles.paginationButton]: viewType === 'pagination',
  });

  return (
    <button
      type={buttonType}
      className={classNameForButton}
      style={{ width }}
    >
      {title}
    </button>
  );
};

export default Button;
