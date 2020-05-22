import React from 'react';
import PropTypes from 'prop-types';
import styles from './Advantages.scss';

const Advantages = ({ advantages }) => (
  <div className={styles.advantages}>
    <h3>Наши преимущества</h3>
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
                {item.name
                  .split(' ')
                  .slice(0, 2)
                  .join(' ')}
              </span>
              {` ${item.name
                .split(' ')
                .slice(2)
                .join(' ')}`}
            </h5>
          </div>
          <div
            className={styles.featuresContent}
            dangerouslySetInnerHTML={{ __html: item.description }}
          />
        </li>
      ))}
    </ul>
  </div>
);

Advantages.propTypes = {
  advantages: PropTypes.arrayOf(PropTypes.object)
};

export default Advantages;
