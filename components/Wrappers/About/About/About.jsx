import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { cookies } from '../../../../utils/getCookies';
import {
  setFiltersInCookies,
  createCleanUrl,
  parseText,
} from '../../../../utils/helpers';
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
      if (cookies.get('filters')) {
        cookies.remove('filters');
      }
      setFiltersInCookies(cookies, {
        ...cookies.get('filters'),
        categories: [
          {
            id: categories.id,
            name: categories.name,
            categoryName: parseText(
              cookies,
              categories.categoryName,
              categories.categoryName,
            ),
          },
        ],
      });

      router.push(
        '/Products',
        `/Products/${createCleanUrl(cookies).join('/')}`,
      );
    }}
  >
    <article className={styles.cardWrapper}>
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
            router.push(
              '/Products',
              `/Products/${createCleanUrl(cookies).join('/')}`,
            );
          }}
        >
          {parseText(cookies, 'Показать', 'Показати')}
        </a>
      </div>
    </article>
  </a>
);

const About = ({ aboutData }) => {
  const router = useRouter();

  useEffect(() => {
    document.querySelector('.About_description').innerHTML = parseText(
      cookies,
      aboutData.about_shop,
      aboutData.about_shop_ua,
    );
    document.querySelector('.About_descriptionHistory').innerHTML = parseText(
      cookies,
      aboutData.history,
      aboutData.history_ua,
    );
    document.querySelector('.About_descriptionCatalog').innerHTML = parseText(
      cookies,
      aboutData.catalog,
      aboutData.catalog_ua,
    );
  }, []);

  return (
    <div className={styles.aboutStore}>
      <h2>{parseText(cookies, 'О магазине', 'Про магазин')}</h2>
      <p className={styles.description} />
      <p className={styles.signature}>
        {parseText(
          cookies,
          'Kolgot.net команда с 2017 года',
          'Kolgot.net команда з 2017 року',
        )}
      </p>
      <h2 className={styles.title}>
        {parseText(cookies, 'История', 'Історія')}
      </h2>
      <p className={styles.descriptionHistory} />
      <DynamicComponentWithNoSSRSlider
        images={aboutData.images}
        classNameWrapper={styles.slider}
      />
      <p className={styles.signature}>
        {parseText(
          cookies,
          'Kolgot.net команда с 2017 года',
          'Kolgot.net команда з 2017 року',
        )}
      </p>
      <h2 className={styles.title}>
        {parseText(cookies, 'Ассортимент', 'Асортимент')}
      </h2>
      <p className={styles.descriptionCatalog} />
      <div className={styles.cards}>
        <CardAbout
          label={parseText(cookies, 'Для девушек', 'Для дівчат')}
          bg="/images/Fashionable_girl_1_22004626.png"
          productAmount={parseText(
            cookies,
            '18 категорий с 860 товарами',
            '18 категорій з 860 товарами',
          )}
          categories={{
            id: 1,
            name: 'zhenshinam',
            categoryName: parseText(cookies, 'Женщинам', 'Жінкам'),
          }}
          router={router}
        />
        <CardAbout
          label={parseText(cookies, 'Для мужчин', 'Для чоловіків')}
          bg="/images/fashionable-man-m.png"
          productAmount={parseText(
            cookies,
            '4 категорий с 240 товарами',
            '4 категорії з 240 товарами',
          )}
          categories={{
            id: 2,
            name: 'muzhchinam',
            categoryName: 'Мужчинам',
          }}
          router={router}
        />
        <CardAbout
          label={parseText(cookies, 'Для детей', 'Для дітей')}
          bg="/images/20150211084144ce492_550.png"
          productAmount={parseText(
            cookies,
            '11 категорий с 419 товарами',
            '11 категорій з 419 товарами',
          )}
          categories={{
            id: 3,
            name: 'detyam',
            categoryName: parseText(cookies, 'Детям', 'Дітям'),
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
    about_shop_ua: PropTypes.string,
    history: PropTypes.string,
    history_ua: PropTypes.string,
    catalog: PropTypes.string,
    catalog_ua: PropTypes.string,
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
