import React from 'react';
import cx from 'classnames';
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

const Rating = ({ amountStars, classNameWrapper }) => (
  <p className={cx(classNameWrapper)}>
    {countStars(amountStars, styles.icon)}
    {countStars(5 - amountStars, styles.iconNoFill)}
  </p>
);

Rating.propTypes = {
  amountStars: PropTypes.number,
  classNameWrapper: PropTypes.string,
};

export default Rating;
