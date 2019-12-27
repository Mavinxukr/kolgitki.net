import React from 'react';
import { data } from './data';
import styles from './Recommendations.scss';

const Recommendations = () => (
  <artile className={styles.card}>
    <h2 className={styles.title}>Рекомендации</h2>
    <div className={styles.cards}>
      {data.map(item => (
        <article className={styles.card} key={item.id}>
          {item.tags.map((tag) => {
            switch (tag.name) {
              case '#Новости':
                return (
                  <p
                    style={{ color: '#0381a2' }}
                    className={styles.tag}
                    key={tag.id}
                  >
                    {tag.name}
                  </p>
                );
              case '#Статьи':
                return (
                  <p
                    style={{ color: '#dA0f47' }}
                    className={styles.tag}
                    key={tag.id}
                  >
                    {tag.name}
                  </p>
                );
              case '#Советы':
                return (
                  <p
                    style={{ color: '#4f69f8' }}
                    className={styles.tag}
                    key={tag.id}
                  >
                    {tag.name}
                  </p>
                );
              default:
            }
          })}
          <h5 className={styles.titleCard}>{item.name}</h5>
        </article>
      ))}
    </div>
  </artile>
);

export default Recommendations;
