import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './BlogCardSimple.scss';

const BlogCardSimple = ({ item, classNameForCard }) => (
  <article className={classNameForCard}>
    <img
      src="/images/ververa_67403054_455097258420211_8361133781576766144_n.png"
      alt="ververa"
      className={styles.image}
    />
    <div className={styles.content}>
      <div className={styles.tags}>
        {item.tags.map(tag => (
          <p className={styles.tag} key={tag.id}>
            {tag.name}
          </p>
        ))}
      </div>
      <h6 className={styles.title}>{item.title}</h6>
      <p className={styles.desc}>{item.desc}</p>
    </div>
    <Link
      href={{
        pathname: '/Blog/[bid]',
        query: { slug: item.slug },
      }}
      as={`/Blog/${item.id}`}
    >
      <a href="/" className={styles.link}>
        Читать далее
      </a>
    </Link>
  </article>
);

BlogCardSimple.propTypes = {
  item: PropTypes.object,
  classNameForCard: PropTypes.string,
};

export default BlogCardSimple;
