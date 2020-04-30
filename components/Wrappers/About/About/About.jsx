import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
import styles from './About.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../../SimpleSlider/SimpleSlider'),
  { ssr: false },
);

const CardAbout = ({
  label, productAmount, bg, categories,
}) => (
  <article style={{ backgroundImage: `url(${bg})` }} className={styles.card}>
    <h2 className={styles.cardTitle}>{label}</h2>
    <div className={styles.cardContent}>
      <p className={styles.cardAmount}>{productAmount}</p>
      <Link
        href={{
          pathname: '/Products',
          query: {
            categories: [categories],
            sort_popular: 'desc',
          },
        }}
        prefetch={false}
      >
        <a href="/" className={styles.cardLink}>
          Показать
        </a>
      </Link>
    </div>
  </article>
);

const About = ({ aboutData }) => {
  useEffect(() => {
    document.querySelector('.About_description').innerHTML =
      aboutData.about_shop;
    document.querySelector('.About_descriptionHistory').innerHTML =
      aboutData.history;
    document.querySelector('.About_descriptionCatalog').innerHTML =
      aboutData.catalog;
  }, []);

  return (
    <div className={styles.aboutStore}>
      <p className={styles.description} />
      <p className={styles.signature}>Kolgot.net команда с 2017 года</p>
      <p className={styles.descriptionHistory} />
      <DynamicComponentWithNoSSRSlider
        images={aboutData.images}
        classNameWrapper={styles.slider}
      />
      <p className={styles.signature}>Kolgot.net команда с 2017 года</p>
      <p className={styles.descriptionCatalog} />
      <div className={styles.cards}>
        <CardAbout
          label="Для девушек"
          bg="/images/Fashionable_girl_1_22004626.png"
          productAmount="18 Категорий с 860 Товарами"
          categories={1}
        />
        <CardAbout
          label="Для мужчин"
          bg="/images/fashionable-man-m.png"
          productAmount="4 Категорий с 240 Товарами"
          categories={2}
        />
        <CardAbout
          label="Для детей"
          bg="/images/20150211084144ce492_550.png"
          productAmount="11 Категорий с 419 Товарами"
          categories={3}
        />
      </div>
    </div>
  );
};

About.propTypes = {
  aboutData: PropTypes.shape({
    about_shop: PropTypes.string,
    history: PropTypes.string,
    catalog: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.object),
  }),
};

CardAbout.propTypes = {
  label: PropTypes.string,
  bg: PropTypes.string,
  productAmount: PropTypes.string,
  categories: PropTypes.number,
};

export default About;
