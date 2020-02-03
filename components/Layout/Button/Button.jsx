import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Button.scss';

const Button = ({
  title,
  viewType,
  buttonType,
  width,
  disabled,
  classNameWrapper,
  onClick,
}) => {
  const classNameForButton = cx(styles.button, {
    [styles.blackButton]: viewType === 'black',
    [styles.whiteButton]: viewType === 'white',
    [styles.redButton]: viewType === 'red',
    [styles.paginationButton]: viewType === 'pagination',
    [styles.footerButton]: viewType === 'footerButton',
    [styles.addToFavouriteButton]: viewType === 'addToFavourite',
    [styles.facebookButton]: viewType === 'facebook',
    [styles.buttonAuth]: viewType === 'auth',
  });

  return (
    <button
      type={buttonType}
      className={cx(classNameForButton, classNameWrapper)}
      style={{ width }}
      disabled={disabled}
      onClick={onClick}
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
  classNameWrapper: PropTypes.oneOfType([PropTypes.string]),
  onClick: PropTypes.func,
};

export default Button;
