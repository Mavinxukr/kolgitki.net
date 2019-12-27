import React from 'react';
import styles from './Blogs.scss';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import MainLayout from '../../Layout/Global/Global';
import Tags from '../../Tags/Tags';
import Recommendations from '../../Recommendations/Recommendations';
import SimpleBlogCard from '../../BlogCardSimple/BlogCardSimple';
import Pagination from '../../Pagination/Pagination';
import { data } from './data';

const Blogs = () => (
  <MainLayout>
    <div className={styles.blogs}>
      <BreadCrumbs value={['Главная', '/ Новости']} />
      <div className={styles.headerBLogs}>
        <h3>Блог</h3>
        <div className={styles.tagsWrapper}>
          <Tags />
        </div>
      </div>
      {/*<div className={styles.clearfix}>*/}
        <div className={styles.recommendationsWrapper}>
          <Recommendations />
        </div>
      {/*</div>*/}
      <div className={styles.cards}>
        {
          data.map(item => (
            <div className={styles.cardWrapper} key={item.id}>
              <SimpleBlogCard item={item} />
            </div>
          ))
        }
      </div>
      <div className={styles.addElements}>
        <div className={styles.addElementsWrapper}>
          <Pagination />
          <button type="button" className={styles.showMoreButton}>Показать ещё +25</button>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default Blogs;
