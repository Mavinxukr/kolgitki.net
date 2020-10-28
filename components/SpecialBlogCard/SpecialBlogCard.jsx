import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './SpecialBlogCard.scss';

const SpecialBlogCard = ({ item, classNameWrapper }) => (
  <article
    style={{
      backgroundImage: `url(${item.image || '/images/ververa_67403054_455097258420211_8361133781576766144_n.png'})`,
    }}
    onMouseOver={e => e.target.parentElement.parentElement.parentElement.classList.add('Blog_show')
    }
    className={`${classNameWrapper} ${styles.card}`}
  >
    <Link href="/Blog/[bid]" as={`/Blog/${item.slug}`} prefetch={false}>
      <a href="/">
        <div className={styles.wrapper}>
          <h6 className={styles.title}>
            {parseText(cookies, item.name, item.name_ua)}
          </h6>
          <p
            className={styles.desc}
            dangerouslySetInnerHTML={{
              __html: parseText(cookies, item.preview, item.preview_ua),
            }}
          />
          <div className={styles.footer}>
            <div className={styles.tags}>
              {item.tags.map(tag => (
                <p key={tag.id} className={styles.tag}>
                  #{parseText(cookies, tag.name, tag.name_ua)}
                </p>
              ))}
            </div>
            <Link href="/Blog/[bid]" as={`/Blog/${item.slug}`} prefetch={false}>
              <a href="/" className={styles.link}>
                {parseText(cookies, 'Читать далее', 'Читати далі')}
              </a>
            </Link>
          </div>
        </div>
      </a>
    </Link>
  </article>
);

SpecialBlogCard.propTypes = {
  item: PropTypes.shape({
    tags: PropTypes.arrayOf(PropTypes.object),
    name: PropTypes.string,
    name_ua: PropTypes.string,
    preview: PropTypes.string,
    preview_ua: PropTypes.string,
    slug: PropTypes.string,
    id: PropTypes.number,
    image: PropTypes.string
  }),
  classNameWrapper: PropTypes.string
};

export default SpecialBlogCard;
