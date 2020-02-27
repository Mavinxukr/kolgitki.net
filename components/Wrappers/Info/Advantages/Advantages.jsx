import React from 'react';
import { data } from './data';
import styles from './Advantages.scss';

const Advantages = () => (
  <div className={styles.advantages}>
    <h3>Наши преимущества</h3>
    <ul className={styles.featuresList}>
      {data.map(item => (
        <li key={item.id} className={styles.featuresItem}>
          <h4 className={styles.featuresTitle}>
            <img
              className={styles.featuresIcon}
              src={item.src}
              alt={item.label}
            />
            <span className={styles.featuresTitleSpan}>{item.label}</span>
            {item.title}
          </h4>
          <div className={styles.featuresContent}>
            <p className={styles.featuresDesc}>{item.desc}</p>
            <a className={styles.featuresLink} href="/">
              {item.link}
            </a>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

export default Advantages;
