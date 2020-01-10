import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.scss';

const Button = ({
  title, viewType, buttonType, width,
}) => {
  const classNameForButton = cx(styles.button, {
    [styles.blackButton]: viewType === 'black',
    [styles.whiteButton]: viewType === 'white',
    [styles.redButton]: viewType === 'red',
    [styles.paginationButton]: viewType === 'pagination',
    [styles.footerButton]: viewType === 'footerButton',
    [styles.addToFavouriteButton]: viewType === 'addToFavourite',
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

Button.propTypes = {
  title: PropTypes.string,
  viewType: PropTypes.string,
  buttonType: PropTypes.string,
  width: PropTypes.string,
};

export default Button;
