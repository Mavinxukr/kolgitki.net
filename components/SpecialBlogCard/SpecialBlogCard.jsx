import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './SpecialBlogCard.scss';

const SpecialBlogCard = ({ item, classNameForCard }) => (
  <article className={`${classNameForCard} ${styles.card}`}>
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
    </div>
  </article>
);

SpecialBlogCard.propTypes = {
  item: PropTypes.object,
  classNameForCard: PropTypes.string,
};

export default SpecialBlogCard;
