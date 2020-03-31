import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './SpecialBlogCard.scss';

const SpecialBlogCard = ({ item, classNameWrapper }) => (
  <article className={`${classNameWrapper} ${styles.card}`}>
    <h6 className={styles.title}>{item.name}</h6>
    <p className={styles.desc}>{item.text}</p>
    <div className={styles.footer}>
      <div className={styles.tags}>
        {item.tags.map(tag => (
          <p key={tag.id} className={styles.tag}>
            #{tag.name}
          </p>
        ))}
      </div>
      <Link
        href={{
          pathname: `/Blog/${item.id}`,
          query: { slug: item.slug },
        }}
      >
        <a href="/" className={styles.link}>
          Читать далее
        </a>
      </Link>
    </div>
  </article>
);

SpecialBlogCard.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    text: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
  }),
  classNameWrapper: PropTypes.string,
};

export default SpecialBlogCard;
