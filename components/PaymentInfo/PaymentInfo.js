import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './PaymentInfo.scss';

const PaymentInfo = ({
  src,
  firstFeature,
  secondFeatures,
  desc,
  classNameWrapper,
}) => (
  <div className={cx(styles.card, classNameWrapper)}>
    <img src={src} alt={src} />
    <ul className={styles.featuresList}>
      <li className={styles.featuresItem}>{firstFeature}</li>
      <li className={styles.featuresItem}>{secondFeatures}</li>
    </ul>
    <p className={styles.cardDesc}>{desc}</p>
  </div>
);

PaymentInfo.propTypes = {
  src: PropTypes.string,
  firstFeature: PropTypes.string,
  secondFeatures: PropTypes.string,
  desc: PropTypes.string,
  classNameWrapper: PropTypes.string,
};

export default PaymentInfo;
