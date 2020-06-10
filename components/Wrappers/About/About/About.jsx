import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { cookies } from '../../../../utils/getCookies';
import { setFiltersInCookies, createCleanUrl } from '../../../../utils/helpers';
import styles from './About.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../../SimpleSlider/SimpleSlider'),
  { ssr: false },
);

const CardAbout = ({
  label, productAmount, bg, categories, router,
}) => (
  <a
    href="/"
    className={styles.card}
    style={{ backgroundImage: `url(${bg})` }}
    onClick={(e) => {
      e.preventDefault();
      setFiltersInCookies(cookies, {
        categories: [categories],
      });
      router.push('/Products', `/Products_${createCleanUrl(cookies).join('_')}`);
    }}
  >
    <article>
      <h2 className={styles.cardTitle}>{label}</h2>
      <div className={styles.cardContent}>
        <p className={styles.cardAmount}>{productAmount}</p>
        <a
          href="/"
          className={styles.cardLink}
          onClick={(e) => {
            e.preventDefault();
            setFiltersInCookies(cookies, {
              categories: [categories],
            });
            router.push('/Products', `/Products_${createCleanUrl(cookies).join('_')}`);
          }}
        >
          Показать
        </a>
      </div>
    </article>
  </a>
);

const About = ({ aboutData }) => {
  const router = useRouter();

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
          categories={{
            id: 1,
            name: 'zhenshinam',
            categoryName: 'Женщинам',
          }}
          router={router}
        />
        <CardAbout
          label="Для мужчин"
          bg="/images/fashionable-man-m.png"
          productAmount="4 Категорий с 240 Товарами"
          categories={{
            id: 1,
            name: 'muzhchinam',
            categoryName: 'Мужчинам',
          }}
          router={router}
        />
        <CardAbout
          label="Для детей"
          bg="/images/20150211084144ce492_550.png"
          productAmount="11 Категорий с 419 Товарами"
          categories={{
            id: 1,
            name: 'detyam',
            categoryName: 'Детям',
          }}
          router={router}
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
  categories: PropTypes.object,
  router: PropTypes.object,
};

export default About;
