import React from 'react';
import styles from './BlogCardSimple.scss';

const BlogCardSimple = ({ item }) => (
  <article className={styles.card}>
    <img
      src="/images/ververa_67403054_455097258420211_8361133781576766144_n.png"
      alt="ververa"
      className={styles.image}
    />
    <div className={styles.content}>
      <div className={styles.tags}>
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
      </div>
      <h5 className={styles.title}>{item.title}</h5>
      <p className={styles.desc}>{item.desc}</p>
    </div>
    <a href="/" className={styles.link}>
      Читать далее
    </a>
  </article>
);

export default BlogCardSimple;
