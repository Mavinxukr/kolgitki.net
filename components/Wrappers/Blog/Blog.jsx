import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { getBlogData } from '../../../redux/actions/blog';
import styles from './Blog.scss';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import MainLayout from '../../Layout/Global/Global';
import Recommendations from '../../Recommendations/Recommendations';
import SimpleBlogCard from '../../BlogCardSimple/BlogCardSimple';
import SpecialBlogCard from '../../SpecialBlogCard/SpecialBlogCard';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { withResponse } from '../../hoc/withResponse';
import {
  blogDataSelector,
  isDataReceivedBlogSelector,
} from '../../../utils/selectors';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';

const tagAll = {
  slug: '',
  id: 100,
  color: '#ececec',
  name: 'Показать все',
  name_ua: 'Показати все',
};

const Blog = ({ tags, isMobileScreenForBlog }) => {
  const isDataReceived = useSelector(isDataReceivedBlogSelector);
  const blogData = useSelector(blogDataSelector);
  const [isLoaded, setIsLoaded] = useState(false);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    setIsLoaded(true);
    dispatch(
      getBlogData({ page: router.query.page || 1, tag: router.query.tag || '' }),
    );
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    dispatch(
      getBlogData({ page: router.query.page || 1, tag: router.query.tag || '' }),
    );
    setTimeout(() => {
      setIsLoaded(false);
    }, 1000);
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      {isLoaded && <Loader />}
      <div className={styles.blog}>
        <BreadCrumbs
          routerName="/Blog"
          items={[
            {
              id: 1,
              name: 'Главная',
              nameUa: 'Головна',
              pathname: '/',
            },
            {
              id: 2,
              name: 'Новости',
              nameUa: 'Новини',
            },
          ]}
        />
        <div className={styles.headerBlog}>
          <h3 className={styles.title}>Блог</h3>
          <div className={styles.tags}>
            {[...tags, tagAll].map(tag => (
              <Link
                href={{
                  pathname: '/Blog',
                  query: {
                    page: 1,
                    tag: tag.slug,
                  },
                }}
                prefetch={false}
                key={tag.id}
              >
                <a
                  className={styles.tag}
                  key={tag.id}
                  style={{ backgroundColor: tag.color }}
                >
                  #{parseText(cookies, tag.name, tag.name_ua)}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.cards}>
            {!blogData.data.length ? (
              <p>
                {parseText(cookies, 'Блогов не найдено', 'Блогов не найдено')}
              </p>
            ) : (
              blogData.data.map((item, index) => (
                <>
                  <div
                    className={styles.cardWrapper}
                    onMouseOut={e => e.currentTarget.classList.remove('Blog_show')
                    }
                  >
                    <SimpleBlogCard key={item.id} item={item} />
                    <SpecialBlogCard key={item.id + 100000} item={item} />
                  </div>
                  {isMobileScreenForBlog && index === 0 && (
                    <Recommendations
                      classNameWrapper={styles.recommendationsWrapper}
                    />
                  )}
                  {window.innerWidth > 1420
                    && !isMobileScreenForBlog
                    && index === 2 && (
                      <Recommendations
                        classNameWrapper={styles.recommendationsWrapper}
                      />
                  )}
                  {window.innerWidth < 1420
                    && !isMobileScreenForBlog
                    && index === 1 && (
                      <Recommendations
                        classNameWrapper={styles.recommendationsWrapper}
                      />
                  )}
                  {!isMobileScreenForBlog
                    && blogData.data.length < 4
                    && blogData.data.length === 2
                    && index === 1 && (
                      <Recommendations
                        style={{ marginLeft: 'auto' }}
                        classNameWrapper={styles.recommendationsWrapper}
                      />
                  )}
                  {!isMobileScreenForBlog
                    && blogData.data.length < 4
                    && blogData.data.length === 1
                    && index === 0 && (
                      <Recommendations
                        style={{ marginLeft: 'auto' }}
                        classNameWrapper={styles.recommendationsWrapper}
                      />
                  )}
                </>
              ))
            )}
          </div>
        </div>
        {blogData.last_page !== 1 && (
          <div className={styles.addElements}>
            <div className={styles.addElementsWrapper}>
              <Pagination
                pageCount={blogData.last_page}
                currentPage={blogData.current_page}
                pathName="/Blog"
                isBlog
              />
              {blogData.last_page !== blogData.current_page && (
                <Button
                  classNameWrapper={styles.paginationButtonWrapper}
                  title={
                    blogData.total - blogData.to > blogData.per_page
                      ? `Показать ещё +${blogData.per_page}`
                      : `Показать ещё +${blogData.total - blogData.to}`
                  }
                  titleUa={
                    blogData.total - blogData.to > blogData.per_page
                      ? `Показати ще +${blogData.per_page}`
                      : `Показати ще +${blogData.total - blogData.to}`
                  }
                  buttonType="button"
                  viewType="pagination"
                  onClick={() => {
                    dispatch(
                      getBlogData(
                        {
                          page: blogData.current_page + 1 || 1,
                          tag: router.query.tag || '',
                        },
                        true,
                      ),
                    );
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

Blog.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  isMobileScreenForBlog: PropTypes.bool,
};

export default withResponse(Blog);
