import React from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getRecommendations } from '../../services/blog';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';

const Recommendations = React.memo(
  ({
    classNameWrapper,
    classNameTitle,
    classNameCards,
    classNameCard,
    classNameTag,
    classNameTitleCard,
    recomendations,
    reverse
  }) => {
    return (
      <aside className={classNameWrapper}>
        <h2 className={classNameTitle}>
          {parseText(cookies, 'Рекомендации', 'Рекомендації')}
        </h2>
        <div className={classNameCards}>
          {recomendations.map((item, index) => {
            if (index <= 3) {
              return !reverse ? (
                <article className={classNameCard} key={item.id}>
                  {item.tags.map(tag => (
                    <p
                      className={classNameTag}
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
                    <a className={classNameTitleCard}>
                      {parseText(cookies, item.name, item.name_uk)}
                    </a>
                  </Link>
                </article>
              ) : (
                <article className={classNameCard} key={item.id}>
                  <Link
                    href="/blog/[bid]"
                    as={`/blog/${item.slug}`}
                    prefetch={false}
                  >
                    <a className={classNameTitleCard}>
                      {parseText(cookies, item.name, item.name_uk)}
                    </a>
                  </Link>
                  {item.tags.map(tag => (
                    <p
                      className={classNameTag}
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
