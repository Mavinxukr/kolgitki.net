import React from 'react';
import dynamic from 'next/dynamic';
import { data } from './data';
import styles from './ProfileViewed.scss';

const DynamicComponentWithNoSSRCard = dynamic(
  () => import('../../Layout/ProductCard/ProductCard'),
  { ssr: false },
);

const ProfileViewed = () => (
  <div className={styles.profileViewed}>
    <h2 className={styles.title}>Просмотренные</h2>
    <div className={styles.cards}>
      {data.map(item => (
        <div className={styles.card} key={item.id}>
          <DynamicComponentWithNoSSRCard item={item} />
        </div>
      ))}
    </div>
  </div>
);

export default ProfileViewed;
