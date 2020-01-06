import React from 'react';
import { data } from './data';
import styles from './Recommendations.scss';

const Recommendations = () => (
  <aside className={styles.recommendations}>
    <h2 className={styles.title}>Рекомендации</h2>
    <div className={styles.cards}>
      {data.map(item => (
        <article className={styles.card} key={item.id}>
          {item.tags.map(tag => (
            <p className={styles.tag} key={tag.id}>
              {tag.name}
            </p>
          ))}
          <h6 className={styles.titleCard}>{item.name}</h6>
        </article>
      ))}
    </div>
  </aside>
);

export default Recommendations;
