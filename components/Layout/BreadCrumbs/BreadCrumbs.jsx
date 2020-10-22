import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { cookies } from '../../../utils/getCookies';
import {
  createCleanUrl,
  parseText,
  setFiltersInCookies,
} from '../../../utils/helpers';
import styles from './BreadCrumbs.scss';

const BreadCrumbs = ({ items, routerName }) => {
  const router = useRouter();
  const pathname = '/Products';

  return (
    <>
      <div className={styles.breadCrumbs}>
        {items.map((item, index) => (
          <>
            {index !== items.length - 1 ? (
              <Link href={item.pathname} prefetch={false}>
                <a
                  onClick={(e) => {
                    e.preventDefault();
                    setFiltersInCookies(cookies, {
                      ...cookies.get('filters'),
                      categories: [
                        ...(cookies
                          .get('filters')
                          .categories?.splice(0, index - 2) || []),
                        {
                          id: item.id,
                          name: item.slug,
                          categoryName: parseText(
                            cookies,
                            item.name,
                            item.name_ua,
                          ),
                        },
                      ],
                      page: 1,
                    });

                    if (routerName) {
                      router.push(
                        {
                          pathname: routerName,
                          query: router.query,
                        },
                        `${routerName}/${createCleanUrl(cookies).join('/')}`,
                        { shallow: true },
                      );
                    } else {
                      router.push(
                        {
                          pathname,
                          query: router.query,
                        },
                        `${pathname}/${createCleanUrl(cookies).join('/')}`,
                        { shallow: true },
                      );
                    }
                  }}
                  className={styles.link}
                  key={item.id}
                >
                  {parseText(cookies, item.name, item.nameUa)}
                </a>
              </Link>
            ) : (
              <p key={item.id} className={styles.link}>
                {parseText(cookies, item.name, item.nameUa)}
              </p>
            )}
          </>
        ))}
      </div>
    </>
  );
};

BreadCrumbs.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object),
  routerName: PropTypes.string,
};

export default BreadCrumbs;
