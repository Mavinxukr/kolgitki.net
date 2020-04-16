import React, { useEffect } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import cx from 'classnames';
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
import {
  blogDataSelector,
  isDataReceivedBlogSelector,
} from '../../../utils/selectors';

const Blog = ({ tags }) => {
  const isDataReceived = useSelector(isDataReceivedBlogSelector);
  const blogData = useSelector(blogDataSelector);

  const dispatch = useDispatch();

  const router = useRouter();

  useEffect(() => {
    dispatch(
      getBlogData({ page: router.query.page || 1, tag: router.query.tag || '' }),
    );
  }, []);

  useEffect(() => {
    dispatch(
      getBlogData({ page: router.query.page || 1, tag: router.query.tag || '' }),
    );
  }, [router.query]);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.blog}>
        <BreadCrumbs items={[{
          id: 1,
          name: 'Главная',
          pathname: '/',
        },
        {
          id: 2,
          name: 'Новости',
        }]}
        />
        <div className={styles.headerBlog}>
          <h3 classNaeme={styles.title}>Блог</h3>
          <div className={styles.tags}>
            {tags.map(tag => (
              <Link
                href={{
                  pathname: '/Blog',
                  query: {
                    page: 1,
                    tag: tag.slug,
                  },
                }}
                prefetch={false}
              >
                <a
                  className={styles.tag}
                  key={tag.id}
                  style={{ backgroundColor: tag.color }}
                >
                  #{tag.name}
                </a>
              </Link>
            ))}
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.cards}>
            {!blogData.data.length ? (
              <p>Блогов не найдено</p>
            ) : (
              blogData.data.map((item) => {
                const classNameWrapper = cx({
                  [styles.simpleCardWrapper]: item.selection,
                  [styles.specialCardWrapper]: !item.selection,
                });

                const Card = item.selection ? SimpleBlogCard : SpecialBlogCard;
                return (
                  <Card
                    key={item.id}
                    classNameWrapper={classNameWrapper}
                    item={item}
                  />
                );
              })
            )}
          </div>
          <Recommendations classNameWrapper={styles.recommendationsWrapper} />
        </div>
        {blogData.last_page !== 1 && (
          <div className={styles.addElements}>
            <div className={styles.addElementsWrapper}>
              <Pagination
                pageCount={blogData.last_page}
                currentPage={blogData.current_page}
                pathName="/Blog"
              />
              <Button
                classNameWrapper={styles.paginationButtonWrapper}
                title="Показать ещё +25"
                buttonType="button"
                viewType="pagination"
                disabled={blogData.current_page + 1 > blogData.last_page}
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
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};

Blog.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
};

export default Blog;
