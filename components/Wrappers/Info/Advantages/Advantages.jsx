import React from 'react';
import PropTypes from 'prop-types';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import styles from './Advantages.scss';

const Advantages = ({ advantages }) => (
  <div className={styles.advantages}>
    <h3>{parseText(cookies, 'Наши преимущества', 'Наші переваги')}</h3>
    <ul className={styles.featuresList}>
      {advantages.map(item => (
        <li key={item.id} className={styles.featuresItem}>
          <div className={styles.featuresTitle}>
            <img
              className={styles.featuresIcon}
              src={item.image_link}
              alt={item.image_link}
            />
            <h5 className={styles.featuresTitleText}>
              <span className={styles.featuresTitleTextRed}>
                {parseText(cookies, item.name, item.name_ua)
                  .split(' ')
                  .slice(0, 2)
                  .join(' ')}
              </span>
              {` ${parseText(cookies, item.name, item.name_ua)
                .split(' ')
                .slice(2)
                .join(' ')}`}
            </h5>
          </div>
          <div
            className={styles.featuresContent}
            dangerouslySetInnerHTML={{
              __html: parseText(cookies, item.description, item.description_ua),
            }}
          />
        </li>
      ))}
    </ul>
  </div>
);

Advantages.propTypes = {
  advantages: PropTypes.arrayOf(PropTypes.object),
};

export default Advantages;
