import React, { useState, useRef, useEffect } from 'react';
import UIKit from '../../../public/uikit/uikit';
import Styles from './AboutStore.module.scss';

const CardAbout = ({ label, productAmount, bg }) => (
  <article style={{ backgroundImage: `url(${bg})` }} className={Styles.AboutStore__Card}>
    <h2 className={Styles.AboutStore__CardTitle}>{label}</h2>
    <div className={Styles.AboutStore__CardContent}>
      <p className={Styles.AboutStore__CardAmount}>{productAmount}</p>
      <a href="/" className={Styles.AboutStore__CardLink}>Показать</a>
    </div>
  </article>
);

const AboutStore = () => {
  const [index, setIndex] = useState(0);
  const [sliderLength, setSliderLength] = useState(0);

  const value = useRef(null);

  useEffect(() => {
    const slider = UIKit.slideshow(value.current);
    setSliderLength(slider.length);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  return (
    <div className={Styles.AboutStore}>
      <h2 className={Styles.AboutStore__Title}>О магазине</h2>
      <p className={Styles.AboutStore__Desc}>
        Национальный совет по проблемам инвалидности (NCD) выпустил отчет,
        в котором документированы тенденции в успеваемости учащихся-инвалидов
        в результате реализации Закона об отсутствии детей, оставшихся без присмотра (NCLB),
        и Закона об обучении лиц с ограниченными возможностями (IDEA). Национальный совет
        по вопросам инвалидности является независимым федеральным агентством, предоставляющим
        рекомендации Президенту и Конгрессу для повышения качества жизни всех американцев
        с ограниченными возможностями и их семей.
      </p>
      <div className={Styles.AboutStore__Image} />
      <p className={Styles.AboutStore__Signature}>Kolgot.net команда с 2017 года</p>
      <h2 className={Styles.AboutStore__TitleChild}>История</h2>
      <p className={Styles.AboutStore__Desc}>
        Национальный совет по проблемам инвалидности (NCD) выпустил отчет,
        в котором документированы тенденции в успеваемости учащихся-инвалидов
        в результате реализации Закона об отсутствии детей, оставшихся без присмотра (NCLB),
        и Закона об обучении лиц с ограниченными возможностями (IDEA). Национальный совет
        по вопросам инвалидности является независимым федеральным агентством, предоставляющим
        рекомендации Президенту и Конгрессу для повышения качества жизни всех американцев
        с ограниченными возможностями и их семей.
      </p>
      <div ref={value} uk-slideshow="autoplay: true, ratio: 7:3, pause-on-hover: true" className={Styles.AboutStore__Slider}>
        <ul className={`${Styles.AboutStore__SliderList} uk-slideshow-items`}>
          <li className={Styles.AboutStore__SliderItem} />
          <li className={Styles.AboutStore__SliderItem} />
          <li className={Styles.AboutStore__SliderItem} />
        </ul>
        <button className={`${Styles.AboutStore__SliderNavButton} ${Styles.AboutStore__SliderNavButtonLeft}`} uk-slideshow-item="previous" />
        <p className={Styles.AboutStore__SliderIndexIndicator}>{index + 1}/{sliderLength}</p>
        <button className={`${Styles.AboutStore__SliderNavButton} ${Styles.AboutStore__SliderNavButtonRight}`} uk-slideshow-item="next" />
      </div>
      <p className={Styles.AboutStore__Signature}>Kolgot.net команда с 2017 года</p>
      <h2 className={Styles.AboutStore__TitleChild}>Ассортимент</h2>
      <p className={Styles.AboutStore__Desc}>
        Национальный совет по проблемам инвалидности (NCD) выпустил отчет,
        в котором документированы тенденции в успеваемости учащихся-инвалидов
        в результате реализации Закона об отсутствии детей, оставшихся без
        присмотра (NCLB), и Закона об обучении лиц.
      </p>
      <div className={Styles.AboutStore__Cards}>
        <CardAbout label="Для девушек" bg="./images/Fashionable_girl_1_22004626.png" productAmount="18 Категорий с 860 Товарами" />
        <CardAbout label="Для мужчин" bg="./images/20150211084144ce492_550.png" productAmount="4 Категорий с 240 Товарами" />
        <CardAbout label="Для детей" bg="./images/fashionable-man-m.png" productAmount="11 Категорий с 419 Товарами" />
      </div>
    </div>
  );
};

export default AboutStore;
