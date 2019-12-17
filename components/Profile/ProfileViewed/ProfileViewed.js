import React from 'react';
import { data } from './data';
import BestProductCard from '../../UIComponents/BestProductCard/BestProductCard';
import Styles from './ProfileViewed.module.scss';

const ProfileViewed = () => (
  <div className={Styles.ProfileViewed}>
    <h2 className={Styles.ProfileViewed__Title}>Просмотренные</h2>
    <div className={Styles.ProfileViewed__Cards}>
      {
        data.map(item => (
          <div className={Styles.ProfileViewed__Card} key={item.id}>
            <BestProductCard item={item} />
          </div>
        ))
      }
    </div>
  </div>
);

export default ProfileViewed;
