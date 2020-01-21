import React from 'react';
import PropTpes from 'prop-types';
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

const Blogs = ({ blogsData }) => (
  <MainLayout>
    <div className={styles.blogs}>
      <BreadCrumbs items={['Главная', 'Новости']} />
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
          {data.map(item => item.view === 'simple' ? (
            <SimpleBlogCard
              key={item.id}
              classNameForCard={styles.simpleCardWrapper}
              item={item}
            />
          ) : (
            <SpecialBlogCard
              key={item.id}
              classNameForCard={styles.specialCardWrapper}
              item={item}
            />
          ))}
        </div>
        <Recommendations
          classNameForRecommendations={styles.recommendationsWrapper}
        />
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

Blogs.propTypes = {
  blogsData: PropTpes.arrayOf(PropTpes.object),
};

export default Blogs;
