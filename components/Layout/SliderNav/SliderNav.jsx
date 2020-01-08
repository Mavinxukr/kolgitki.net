import React from 'react';
import styles from './SliderNav.scss';
import IconArrow from '../../../assets/svg/Group 621.svg';

const SliderNav = ({ index, sliderLength, classNameForNav }) => (
  <div className={`${styles.navBar} ${classNameForNav}`}>
    <a href="/" className={styles.navButton} uk-slideshow-item="previous">
      <IconArrow className={`${styles.arrow} ${styles.arrowLeft}`} />
    </a>
    <p className={styles.indexIndicator}>
      {index + 1}/{sliderLength}
    </p>
    <a href="/" className={styles.navButton} uk-slideshow-item="next">
      <IconArrow className={`${styles.arrow}`} />
    </a>
  </div>
);

export default SliderNav;
