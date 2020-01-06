import React from 'react';
import styles from './SpecialBlogCard.scss';

const SpecialBlogCard = ({ item }) => (
  <article className={styles.card}>
    <h6 className={styles.title}>{item.title}</h6>
    <p className={styles.desc}>{item.desc}</p>
    <div className={styles.footer}>
      <div className={styles.tags}>
        {item.tags.map(tag => (
          <p key={tag.id} className={styles.tag}>
            {tag.name}
          </p>
        ))}
      </div>
      <a className={styles.link} href="/">
        Читать далее
      </a>
    </div>
  </article>
);

export default SpecialBlogCard;
