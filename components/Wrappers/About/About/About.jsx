import React from 'react';
import dynamic from 'next/dynamic';
import styles from './About.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../../SimpleSlider/SimpleSlider'),
  { ssr: false },
);

const CardAbout = ({ label, productAmount, bg }) => (
  <article style={{ backgroundImage: `url(${bg})` }} className={styles.card}>
    <h2 className={styles.cardTitle}>{label}</h2>
    <div className={styles.cardContent}>
      <p className={styles.cardAmount}>{productAmount}</p>
      <a href="/" className={styles.cardLink}>
        Показать
      </a>
    </div>
  </article>
);

const About = () => (
  <div className={styles.aboutStore}>
    <h2>О магазине</h2>
    <p className={styles.desc}>
      Национальный совет по проблемам инвалидности (NCD) выпустил отчет, в
      котором документированы тенденции в успеваемости учащихся-инвалидов в
      результате реализации Закона об отсутствии детей, оставшихся без присмотра
      (NCLB), и Закона об обучении лиц с ограниченными возможностями (IDEA).
      Национальный совет по вопросам инвалидности является независимым
      федеральным агентством, предоставляющим рекомендации Президенту и
      Конгрессу для повышения качества жизни всех американцев с ограниченными
      возможностями и их семей.
    </p>
    <div className={styles.image} />
    <p className={styles.signature}>Kolgot.net команда с 2017 года</p>
    <h2 className={styles.titleChild}>История</h2>
    <p className={styles.desc}>
      Национальный совет по проблемам инвалидности (NCD) выпустил отчет, в
      котором документированы тенденции в успеваемости учащихся-инвалидов в
      результате реализации Закона об отсутствии детей, оставшихся без присмотра
      (NCLB), и Закона об обучении лиц с ограниченными возможностями (IDEA).
      Национальный совет по вопросам инвалидности является независимым
      федеральным агентством, предоставляющим рекомендации Президенту и
      Конгрессу для повышения качества жизни всех американцев с ограниченными
      возможностями и их семей.
    </p>
    <DynamicComponentWithNoSSRSlider classNameWrapper={styles.slider} />
    <p className={styles.signature}>Kolgot.net команда с 2017 года</p>
    <h2 className={styles.titleChild}>Ассортимент</h2>
    <p className={styles.desc}>
      Национальный совет по проблемам инвалидности (NCD) выпустил отчет, в
      котором документированы тенденции в успеваемости учащихся-инвалидов в
      результате реализации Закона об отсутствии детей, оставшихся без присмотра
      (NCLB), и Закона об обучении лиц.
    </p>
    <div className={styles.cards}>
      <CardAbout
        label="Для девушек"
        bg="/images/Fashionable_girl_1_22004626.png"
        productAmount="18 Категорий с 860 Товарами"
      />
      <CardAbout
        label="Для мужчин"
        bg="/images/20150211084144ce492_550.png"
        productAmount="4 Категорий с 240 Товарами"
      />
      <CardAbout
        label="Для детей"
        bg="/images/fashionable-man-m.png"
        productAmount="11 Категорий с 419 Товарами"
      />
    </div>
  </div>
);

export default About;
