import React from 'react';
import ReactPlayer from 'react-player';
import dynamic from 'next/dynamic';
import styles from './BlogArticle.scss';
import MainLayout from '../../Layout/Global/Global';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import Recommendations from '../../Recommendations/Recommendations';
import Products from '../Products/Products';
import { data } from './data';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../SimpleSlider/SimpleSlider'),
  { ssr: false },
);

const BlogArticle = () => (
  <MainLayout>
    <div className={styles.content}>
      <BreadCrumbs items={['Главная', 'Новости', 'Post 025']} />
      <div className={styles.infoWrapper}>
        <Recommendations
          classNameForRecommendations={styles.recommendationWrapper}
        />
        <div className={styles.mainInfo}>
          <a href="/" className={styles.linkBack}>
            Назад
          </a>
          <div className={styles.text}>
            <h2>Ежегодный показ колготок в Вене</h2>
            <div className={styles.tagsBlock}>
              <div className={styles.tags}>
                <span className={styles.tagNews}>#Новости</span>
                <span className={styles.tagAdvice}>#Советы</span>
                <span className={styles.tagArticle}>#Статьи</span>
              </div>
              <p className={styles.date}>21.10.2019</p>
            </div>
            <h2 className={styles.titleHistory}>История</h2>
            <p className={styles.descHistory}>
              Рекламодатели изучают, как люди учатся, чтобы они могли «научить»
              их реагировать на их рекламу. Они хотят, чтобы нам было интересно,
              попробовать что-то, а затем сделать это снова. Это элементы
              обучения: интерес, опыт и повторение.
            </p>
          </div>
          <DynamicComponentWithNoSSRSlider />
          <div className={styles.text}>
            <h2 className={styles.titleFounders}>Основатели</h2>
            <p className={styles.descFounders}>
              Потребители учатся обобщать то, чему они научились. Поэтому
              рекламодатели иногда копи весьма успешную идею, которая была
              хорошо изучена потребителями. Например, очень успешная реклама
              Weston Tea Country для разных сортов чая привела к появлению
              DAEWOO Country для автодилеров и Cadbury Country для шоколадных
              батончиков.
            </p>
            <p className={styles.descFounders}>
              Если реклама предназначена для того, чтобы он узнал, то необходимо
              много повторений. Но рекламодатели должны быть осторожны, потому
              что слишком много повторений может прив к усталости потребителей,
              и сообщение может упасть на «уши».
            </p>
          </div>
          <div className={styles.player}>
            <ReactPlayer
              width="100%"
              height="100%"
              url="https://youtu.be/MRRM6O40hWs"
              controls
            />
          </div>
          <p className={styles.descSeo}>
            Если реклама предназначена для того, чтобы он узнал, то необходимо
            много повторений. рекламодатели должны быть осторожны, потому что
            слишком много повторений может привести к усталости потребителей, и
            сообщение может упасть на «уши».
          </p>
          <a href="/" className={styles.linkBack}>
            Назад
          </a>
        </div>
      </div>
      <hr className={styles.line} />
      {/*<Products products={data} classNameForProducts={styles.productsWrapper} />*/}
    </div>
  </MainLayout>
);

export default BlogArticle;
