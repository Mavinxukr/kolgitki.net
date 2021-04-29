import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getRecommendations } from '../../services/blog';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './Recommendations.scss';

const Recommendations = React.memo(
  ({ classNameWrapper, style, recomendations, reverse }) => {
    return (
      <aside style={style} className={classNameWrapper}>
        <h2 className={styles.title}>
          {parseText(cookies, 'Рекомендации', 'Рекомендації')}
        </h2>
        <div className={styles.cards}>
          {recomendations.map((item, index) => {
            if (index <= 3) {
              return !reverse ? (
                <article className={styles.card} key={item.id}>
                  {item.tags.map(tag => (
                    <p
                      className={styles.tag}
                      style={{ color: `${tag.color}` }}
                      key={tag.id}
                    >
                      #{parseText(cookies, tag.name, tag.name_ua)}
                    </p>
                  ))}
                  <Link
                    href="/blog/[bid]"
                    as={`/blog/${item.slug}`}
                    prefetch={false}
                  >
                    <a className={styles.titleCard}>
                      {parseText(cookies, item.name, item.name_uk)}
                    </a>
                  </Link>
                </article>
              ) : (
                <article className={styles.card} key={item.id}>
                  <Link
                    href="/blog/[bid]"
                    as={`/blog/${item.slug}`}
                    prefetch={false}
                  >
                    <a className={styles.titleCard}>
                      {parseText(cookies, item.name, item.name_uk)}
                    </a>
                  </Link>
                  {item.tags.map(tag => (
                    <p
                      className={styles.tag}
                      style={{ color: `${tag.color}` }}
                      key={tag.id}
                    >
                      #{parseText(cookies, tag.name, tag.name_ua)}
                    </p>
                  ))}
                </article>
              );
            } else {
              return null;
            }
          })}
        </div>
      </aside>
    );
  }
);

Recommendations.propTypes = {
  classNameWrapper: PropTypes.string,
  style: PropTypes.string
};

export default Recommendations;
