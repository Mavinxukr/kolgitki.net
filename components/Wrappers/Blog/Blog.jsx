import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { createSelector } from 'reselect';
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

const isDataReceivedSelector = createSelector(
  state => state.blog.isDataReceived,
  isDataReceived => isDataReceived,
);

const blogSelector = createSelector(
  state => state.blog.blog,
  blog => blog,
);

const Blog = ({ tags }) => {
  const isDataReceived = useSelector(isDataReceivedSelector);
  const blogData = useSelector(blogSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBlogData({}));
  }, []);

  if (!isDataReceived) {
    return <Loader />;
  }

  return (
    <MainLayout>
      <div className={styles.blog}>
        <BreadCrumbs items={['Главная', 'Новости']} />
        <div className={styles.headerBlog}>
          <h3>Блог</h3>
          <div className={styles.tags}>
            {tags.map(tag => (
              <button
                type="button"
                className={styles.tag}
                key={tag.id}
                style={{ backgroundColor: tag.color }}
                onClick={() => dispatch(getBlogData({ tag: tag.slug }))}
              >
                {tag.name}
              </button>
            ))}
          </div>
        </div>
        <div className={styles.mainInfo}>
          <div className={styles.cards}>
            {!blogData.data.length ? (
              <p>Блогов по этому тегу не найдено</p>
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
          <Recommendations
            classNameForRecommendations={styles.recommendationsWrapper}
          />
        </div>
        <div className={styles.addElements}>
          {
            blogData.data.lenght > 25 ? (
              <div className={styles.addElementsWrapper}>
                <Pagination />
                <Button
                  width="246px"
                  title="Показать ещё +25"
                  buttonType="button"
                  viewType="pagination"
                />
              </div>
            ) : null
          }
        </div>
      </div>
    </MainLayout>
  );
};

Blog.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
};

export default Blog;
