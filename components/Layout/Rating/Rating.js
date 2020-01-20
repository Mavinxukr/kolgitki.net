import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import IconStar from '../../../assets/svg/star.svg';
import styles from './Rating.scss';

const countStars = ({ amountStars, className }) => {
  const arrRenderStart = [];
  for (let i = 0; i < amountStars; i += 1) {
    arrRenderStart.push(<IconStar className={className} />);
  }
  return arrRenderStart;
};

const Rating = ({ amountStars, classNameWrapper, onClick }) => (
  <p className={cx(classNameWrapper)}>
    {[...countStars({
      amountStars,
      className: styles.icon,
    }), ...countStars({
      amountStars: 5 - amountStars,
      className: styles.iconNoFill,
    })].map((item, index) => (
      <span key={index} onClick={() => onClick(index + 1)}>
        {item}
      </span>
    ))}
  </p>
);

Rating.propTypes = {
  amountStars: PropTypes.number,
  classNameWrapper: PropTypes.string,
  onClick: PropTypes.func,
};

export default Rating;
