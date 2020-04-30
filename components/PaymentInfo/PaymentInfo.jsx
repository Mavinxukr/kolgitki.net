import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './PaymentInfo.scss';

const PaymentInfo = ({ item, classNameWrapper }) => (
  <div
    className={cx(styles.card, classNameWrapper)}
    dangerouslySetInnerHTML={{ __html: item.description }}
  />
);

PaymentInfo.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
  }),
  classNameWrapper: PropTypes.string,
};

export default PaymentInfo;
