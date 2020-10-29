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

const BreadCrumbs = ({ items, routerName, isGift }) => {
  const router = useRouter();
  const pathname = isGift ? '/gift-backets' : '/Products';

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
                    if (item.pathname === '/') {
                      cookies.remove('filters');
                      router.push('/');
                      return;
                    }
                    if (item.pathname === '/Blog') {
                      cookies.remove('filters');
                      router.push('/Blog');
                      return;
                    }
                    if (item.pathname === '/gift-backets') {
                      cookies.remove('filters');
                      router.push('/gift-backets');
                      return;
                    }
                    if (item.pathname === '/novinki') {
                      cookies.remove('filters');
                      setFiltersInCookies(cookies, { sort_date: 'desc' });
                      router.push('/Products', `/Products/${createCleanUrl(cookies).join('/')}`);
                      return;
                    }
                    if (item.pathname === '/stock') {
                      cookies.remove('filters');
                      setFiltersInCookies(cookies, {
                        categories: [
                          {
                            id: 1,
                            name: 'akcii',
                            categoryName: parseText(cookies, 'Акции', 'Акції'),
                          },
                        ],
                      });
                      router.push('/stock');
                      return;
                    }
                    setFiltersInCookies(cookies, {
                      ...cookies.get('filters'),
                      categories: [
                        ...(cookies
                          .get('filters')
                          .categories?.splice(0, index - 1) || []),
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
  isGift: PropTypes.bool,
};

export default BreadCrumbs;
