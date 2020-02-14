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
  href,
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

  const TagName = href ? 'a' : 'button';

  return (
    <TagName
      type={buttonType}
      className={cx(classNameForButton, classNameWrapper)}
      style={{ width }}
      disabled={disabled}
      onClick={onClick}
    >
      {title}
    </TagName>
  );
};

Button.propTypes = {
  title: PropTypes.string,
  viewType: PropTypes.oneOf([
    'black',
    'white',
    'red',
    'pagination',
    'footerButton',
    'addToFavourite',
    'facebook',
    'auth',
  ]),
  buttonType: PropTypes.string,
  width: PropTypes.string,
  disabled: PropTypes.bool,
  classNameWrapper: PropTypes.string,
  onClick: PropTypes.func,
  href: PropTypes.bool,
};

export default Button;
