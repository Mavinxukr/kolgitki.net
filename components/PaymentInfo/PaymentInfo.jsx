import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './PaymentInfo.scss';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';

const PaymentInfo = ({ item, classNameWrapper }) => (
  <div
    className={cx(styles.card, classNameWrapper)}
    dangerouslySetInnerHTML={{
      __html: parseText(cookies, item.description, item.description_ua),
    }}
  />
);

PaymentInfo.propTypes = {
  item: PropTypes.shape({
    description: PropTypes.string,
  }),
  classNameWrapper: PropTypes.string,
};

export default PaymentInfo;
