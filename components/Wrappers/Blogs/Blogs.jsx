import React from 'react';
import styles from './Blogs.scss';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import MainLayout from '../../Layout/Global/Global';
import Recommendations from '../../Recommendations/Recommendations';
import SimpleBlogCard from '../../BlogCardSimple/BlogCardSimple';
import SpecialBlogCard from '../../SpecialBlogCard/SpecialBlogCard';
import Pagination from '../../Pagination/Pagination';
import Button from '../../Layout/Button/Button';
import { data } from './data';
import { tags } from './tags';

const Blogs = () => (
  <MainLayout>
    <div className={styles.blogs}>
      <BreadCrumbs value={['Главная', '/ Новости']} />
      <div className={styles.headerBLogs}>
        <h3>Блог</h3>
        <div className={styles.tags}>
          {tags.map(tag => (
            <p className={styles.tag} key={tag.id}>
              {tag.name}
            </p>
          ))}
        </div>
      </div>
      <div className={styles.mainInfo}>
        <div className={styles.cards}>
          {data.map((item) => {
            const BlogCard = item.view === 'simple' ? SimpleBlogCard : SpecialBlogCard;
            return (
              <div className={styles.cardWrapper} key={item.id}>
                <BlogCard item={item} />
              </div>
            );
          })}
        </div>
        <div className={styles.recommendationsWrapper}>
          <Recommendations />
        </div>
      </div>
      <div className={styles.addElements}>
        <div className={styles.addElementsWrapper}>
          <Pagination />
          <Button
            width="246px"
            title="Показать ещё +25"
            buttonType="button"
            viewType="pagination"
          />
        </div>
      </div>
    </div>
  </MainLayout>
);

export default Blogs;
