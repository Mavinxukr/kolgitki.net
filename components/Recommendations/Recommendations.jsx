import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { getRecommendations } from '../../services/blog';
import styles from './Recommendations.scss';

const Recommendations = ({ classNameWrapper }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    getRecommendations({}).then(response => setData(response.data));
  }, []);

  return (
    <aside className={classNameWrapper}>
      <h2 className={styles.title}>Рекомендации</h2>
      <div className={styles.cards}>
        {data.map(item => (
          <article className={styles.card} key={item.id}>
            {item.tags.map(tag => (
              <p
                className={styles.tag}
                style={{ color: `${tag.color}` }}
                key={tag.id}
              >
                #{tag.name}
              </p>
            ))}
            <Link
              href="/Blog/[bid]"
              as={`/Blog/${item.slug}`}
              prefetch={false}
            >
              <a className={styles.titleCard}>{item.name}</a>
            </Link>
          </article>
        ))}
      </div>
    </aside>
  );
};

Recommendations.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default Recommendations;
