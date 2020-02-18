import React from 'react';
import PropTypes from 'prop-types';
import styles from './UserMessageBlock.scss';

const UserMessageBlock = ({ message }) => (
  <div className={styles.message}>{message}</div>
);

UserMessageBlock.propTypes = {
  message: PropTypes.string,
};
