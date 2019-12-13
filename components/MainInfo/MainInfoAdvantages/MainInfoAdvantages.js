import React from 'react';
import { data } from './data';
import Styles from './MainInfoAdvantages.module.scss';

const MainInfoAdvantages = () => (
  <div className={Styles.MainInfoAdvantages}>
    <h2 className={Styles.MainInfoAdvantages__Title}>Наши преимущества</h2>
    <ul className={Styles.MainInfoAdvantages__FeaturesList}>
      {
        data.map(item => (
          <li key={item.id} className={Styles.MainInfoAdvantages__FeaturesItem}>
            <h2 className={Styles.MainInfoAdvantages__FeaturesTitle}>
              <img className={Styles.MainInfoAdvantages__FeaturesIcon} src={item.src} alt={item.label} />
              <span className={Styles.MainInfoAdvantages__FeaturesTitleSpan}>{item.label}</span>
              {item.title}
            </h2>
            <div className={Styles.MainInfoAdvantages__FeaturesContent}>
              <p className={Styles.MainInfoAdvantages__FeaturesDesc}>{item.desc}</p>
              <a className={Styles.MainInfoAdvantages__FeaturesLink} href="/">{item.link}</a>
            </div>
          </li>
        ))
      }
    </ul>
  </div>
);

export default MainInfoAdvantages;
