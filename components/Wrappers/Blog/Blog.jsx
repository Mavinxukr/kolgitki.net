import React, { useState, useEffect, useReducer } from 'react';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import PropTypes, { func } from 'prop-types';
import { getBlogData, getBlogDataSuccess } from '../../../redux/actions/blog';
import styles from './Blog.scss';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import MainLayout from '../../Layout/Global/Global';
import Recommendations from '../../Recommendations/Recommendations';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import Loader from '../../Loader/Loader';
import { withResponse } from '../../hoc/withResponse';
import {
  blogDataSelector,
  isDataReceivedBlogSelector,
  loadingBlogSelector
} from '../../../utils/selectors';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import { BlogCard } from '../../BlogCard/BlogCard';
import { getRecommendations, getTags } from '../../../services/blog';

const tagAll = {
  slug: '',
  id: 100,
  color: '#ececec',
  name: 'Показать все',
  name_ua: 'Показати все'
};

const Blog = ({
  recomendations: serverRecomendations,
  filters: serverFilters,
  blogs: serverBlogs,
  tags: serverTags,
  isMobileScreenForBlog
}) => {
  const [recomendations, setRecomendations] = useState(serverRecomendations);
  const [filters, setFilters] = useState(serverFilters);
  const [tags, setTags] = useState(serverTags);
  const loading = useSelector(loadingBlogSelector);

  const isDataReceived = useSelector(isDataReceivedBlogSelector);
  const blogs = useSelector(blogDataSelector);

  const dispatch = useDispatch();
  const router = useRouter();

  async function loadRecomendation() {
    const response = await getRecommendations({});
    if (response.status) {
      setRecomendations(response.data);
    }
  }
  const getBlogHandle = data => {
    dispatch(getBlogData(data));
  };

  async function loadTags() {
    const response = await getTags();
    if (response.status) {
      setTags(response.data);
    }
  }

  useEffect(() => {
    if (!recomendations) {
      loadRecomendation();
    }
    if (!tags) {
      loadTags();
    }
    if (serverBlogs) {
      dispatch(getBlogDataSuccess(serverBlogs));
    }
  }, []);

  useEffect(() => {
    getBlogHandle(router.query);
    setFilters(router.query);
  }, [router.query]);

  useEffect(() => {
    console.log(blogs);
  }, [blogs]);

  if (!blogs || !tags || !isDataReceived || !recomendations) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.blog}>
        <BreadCrumbs
          items={[
            {
              id: 1,
              name: 'Главная',
              nameUa: 'Головна',
              pathname: '/'
            },
            {
              id: 2,
              name: 'Новости',
              nameUa: 'Новини',
              pathname: 'blog'
            }
          ]}
        />
        <div className={styles.headerBlog}>
          <h3 className={styles.title}>Блог</h3>
          <div className={styles.tags}>
            {[...tags, tagAll].map(tag => {
              const params = {
                tag: tag.slug
              };
              if (params.tag === '') {
                delete params.tag;
              }

              if (filters.hasOwnProperty('page')) {
                params.page = filters.page;
              }

              return (
                <Link
                  href={{
                    pathname: '/blog',
                    query: params
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
              );
            })}
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.cards}>
            {loading ? (
              <Loader />
            ) : !blogs.data.length ? (
              <p>
                {parseText(cookies, 'Блогов не найдено', 'Блогов не найдено')}
              </p>
            ) : (
              blogs.data.map((item, index) => (
                <React.Fragment key={item.id}>
                  <BlogCard blog={item} />
                  {isMobileScreenForBlog && index === 0 && (
                    <Recommendations
                      classNameWrapper={styles.recommendationsWrapper}
                      classNameTitle={styles.recommendationTitle}
                      classNameCards={styles.recommendationCards}
                      classNameCard={styles.recommendationCard}
                      classNameTag={styles.recommendationTag}
                      classNameTitleCard={styles.recommendationTitleCard}
                      recomendations={recomendations}
                    />
                  )}
                  {window.innerWidth > 1420 &&
                    !isMobileScreenForBlog &&
                    index === 2 && (
                      <Recommendations
                        classNameWrapper={styles.recommendationsWrapper}
                        classNameTitle={styles.recommendationTitle}
                        classNameCards={styles.recommendationCards}
                        classNameCard={styles.recommendationCard}
                        classNameTag={styles.recommendationTag}
                        classNameTitleCard={styles.recommendationTitleCard}
                        recomendations={recomendations}
                      />
                    )}
                  {window.innerWidth < 1420 &&
                    !isMobileScreenForBlog &&
                    index === 1 && (
                      <Recommendations
                        classNameWrapper={styles.recommendationsWrapper}
                        classNameTitle={styles.recommendationTitle}
                        classNameCards={styles.recommendationCards}
                        classNameCard={styles.recommendationCard}
                        classNameTag={styles.recommendationTag}
                        classNameTitleCard={styles.recommendationTitleCard}
                        recomendations={recomendations}
                      />
                    )}
                  {!isMobileScreenForBlog &&
                    blogs.data.length < 4 &&
                    blogs.data.length === 2 &&
                    index === 1 && (
                      <Recommendations
                        classNameWrapper={styles.recommendationsWrapper}
                        classNameTitle={styles.recommendationTitle}
                        classNameCards={styles.recommendationCards}
                        classNameCard={styles.recommendationCard}
                        classNameTag={styles.recommendationTag}
                        classNameTitleCard={styles.recommendationTitleCard}
                        recomendations={recomendations}
                      />
                    )}
                  {!isMobileScreenForBlog &&
                    blogs.data.length < 4 &&
                    blogs.data.length === 1 &&
                    index === 0 && (
                      <Recommendations
                        classNameWrapper={styles.recommendationsWrapper}
                        classNameTitle={styles.recommendationTitle}
                        classNameCards={styles.recommendationCards}
                        classNameCard={styles.recommendationCard}
                        classNameTag={styles.recommendationTag}
                        classNameTitleCard={styles.recommendationTitleCard}
                        recomendations={recomendations}
                      />
                    )}
                </React.Fragment>
              ))
            )}
          </div>
        </div>
        {blogs.last_page !== 1 && (
          <div className={styles.addElements}>
            <div className={styles.addElementsWrapper}>
              <Pagination
                pageCount={blogs.last_page}
                currentPage={blogs.current_page}
                setPage={number => {
                  const newFilters = { ...filters };
                  newFilters.page = number;
                  let query = '';

                  Object.keys(newFilters).map(
                    filter => (query += `${filter}=${newFilters[filter]}&`)
                  );

                  query = query.slice(0, -1);
                  router.push(`${router.asPath.split('?')[0]}?${query}`);
                }}
              />
              {blogs.last_page !== blogs.current_page && (
                <Button
                  classNameWrapper={styles.paginationButtonWrapper}
                  title={
                    blogs.total - blogs.to > blogs.per_page
                      ? `Показать ещё +${blogs.per_page}`
                      : `Показать ещё +${blogs.total - blogs.to}`
                  }
                  titleUa={
                    blogs.total - blogs.to > blogs.per_page
                      ? `Показати ще +${blogs.per_page}`
                      : `Показати ще +${blogs.total - blogs.to}`
                  }
                  buttonType="button"
                  viewType="pagination"
                  onClick={() => {
                    dispatch(
                      getBlogData(
                        {
                          ...filters,
                          page: blogs.current_page + 1 || 1
                        },
                        true
                      )
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
  isMobileScreenForBlog: PropTypes.bool
};

export default withResponse(Blog);
