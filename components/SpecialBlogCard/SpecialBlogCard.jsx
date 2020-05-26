import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styles from './SpecialBlogCard.scss';

const SpecialBlogCard = ({ item, classNameWrapper }) => (
  <article
    style={{
      backgroundImage: `url(${item.image || '/images/goldentights-02.png'})`,
    }}
    className={`${classNameWrapper} ${styles.card}`}
  >
    <h6 className={styles.title}>{item.name}</h6>
    <p className={styles.desc}>{item.preview}</p>
    <div className={styles.footer}>
      <div className={styles.tags}>
        {item.tags.map(tag => (
          <p key={tag.id} className={styles.tag}>
            #{tag.name}
          </p>
        ))}
      </div>
      <Link href="/Blog/[bid]" as={`/Blog/${item.id}`} prefetch={false}>
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
    preview: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string,
  }),
  classNameWrapper: PropTypes.string,
};

export default SpecialBlogCard;
