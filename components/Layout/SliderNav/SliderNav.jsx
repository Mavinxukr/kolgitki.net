import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './SliderNav.scss';
import IconArrow from '../../../assets/svg/Group 621.svg';

const SliderNav = ({ index, sliderLength, classNameWrapper }) => (
  <div className={cx(styles.navBar, classNameWrapper)}>
    <button type="button" className={styles.navButton} uk-slideshow-item="previous">
      <IconArrow className={`${styles.arrow} ${styles.arrowLeft}`} />
    </button>
    <p className={styles.indexIndicator}>
      {index + 1}/{sliderLength}
    </p>
    <button type="button" className={styles.navButton} uk-slideshow-item="next">
      <IconArrow className={`${styles.arrow}`} />
    </button>
  </div>
);

SliderNav.propTypes = {
  index: PropTypes.number,
  sliderLength: PropTypes.number,
  classNameWrapper: PropTypes.string,
};

export default SliderNav;
