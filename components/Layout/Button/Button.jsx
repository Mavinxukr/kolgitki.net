import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.scss';

const Button = ({
  title, viewType, buttonType, width, disabled,
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
      disabled={disabled}
    >
      {title}
    </button>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  viewType: PropTypes.oneOf(['full', 'outlined', 'transparent']),
  color: PropTypes.oneOf(['red', 'white', 'black']),
  icon: PropTypes.element,
  iconPosition: PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
  size: PropTypes.oneOf(['small', 'medium', 'big', 'large']),
  buttonType: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
};

export default Button;
