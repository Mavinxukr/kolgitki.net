import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './BlogCardSimple.scss';

const BlogCardSimple = ({ item, classNameWrapper }) => (
  <article className={classNameWrapper}>
    <img
      src="/images/ververa_67403054_455097258420211_8361133781576766144_n.png"
      alt="ververa"
      className={styles.image}
    />
    <div className={styles.content}>
      <div className={styles.tags}>
        {item.tags.map(tag => (
          <p className={styles.tag} style={{ color: tag.color }} key={tag.id}>
            #{tag.name}
          </p>
        ))}
      </div>
      <h6 className={styles.title}>{item.name}</h6>
      <p className={styles.desc}>{item.preview}</p>
    </div>
    <Link
      href={{
        pathname: `/Blog/${item.id}`,
        query: { slug: item.slug, sort_popular: 'desc' },
      }}
      prefetch={false}
    >
      <a href="/" className={styles.link}>
        Читать далее
      </a>
    </Link>
  </article>
);

BlogCardSimple.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    preview: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
  }),
  classNameWrapper: PropTypes.string,
};

export default BlogCardSimple;
