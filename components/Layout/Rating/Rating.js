import React from 'react';
import PropTypes from 'prop-types';
import IconStar from '../../../assets/svg/star.svg';
import styles from './Rating.scss';

const countStars = (amountStars, classNameForStar) => {
  const arrRenderStart = [];
  for (let i = 0; i < amountStars; i += 1) {
    arrRenderStart.push(
      <span key={`f${((Math.random() * 1e8)).toString(16)}`}>
        <IconStar className={classNameForStar} />
      </span>,
    );
  }
  return arrRenderStart;
};

const Rating = ({ amountStars, classNameForRating }) => (
  <p className={classNameForRating}>
    {countStars(amountStars, styles.icon)}
    {countStars(5 - amountStars, styles.iconNoFill)}
  </p>
);

Rating.propTypes = {
  amountStars: PropTypes.number,
  classNameForRating: PropTypes.string,
};

export default Rating;
