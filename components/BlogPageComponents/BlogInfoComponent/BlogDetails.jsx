import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import styles from './BlogDetails.scss';
import IconArrow from '../../../assets/svg/Group 621.svg';
import UIKit from '../../../public/uikit/uikit';

const BlogDetails = () => {
  const [index, setIndex] = useState(0);

  const value = useRef(null);

  useEffect(() => {
    const slider = UIKit.slideshow(value.current);
    value.current.addEventListener('itemshow', () => {
      setIndex(slider.index);
    });
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.text}>
        <h2 className={styles.title}>
          Ежегодный показ колготок в Вене
        </h2>
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
          Рекламодатели изучают, как люди учатся, чтобы они могли «научить» их
          реагировать на их рекламу. Они хотят, чтобы нам было интересно,
          попробовать что-то, а затем сделать это снова. Это элементы обучения:
          интерес, опыт и повторение.
        </p>
      </div>
      <div
        ref={value}
        uk-slideshow="autoplay: true, ratio: 7:3, pause-on-hover: true"
        className={styles.slider}
      >
        <ul className={`${styles.sliderList} uk-slideshow-items`}>
          <li className={styles.sliderItem}>
            <img
              className={styles.sliderImage}
              src="/images/858x540.png"
              alt="image1"
            />
          </li>
          <li className={styles.sliderItem}>
            <img
              className={styles.sliderImage}
              src="/images/858x540.png"
              alt="image2"
            />
          </li>
          <li className={styles.sliderItem}>
            <img
              className={styles.sliderImage}
              src="/images/858x540.png"
              alt="image3"
            />
          </li>
        </ul>
        <a
          href="/"
          className={`${styles.sliderNavButton} ${styles.sliderNavButtonLeft}`}
          uk-slideshow-item="previous"
        >
          <IconArrow
            className={`${styles.sliderArrow} ${styles.arrowLeft}`}
          />
        </a>
        <p className={styles.sliderIndexIndicator}>
          {index + 1}/3
        </p>
        <a
          href="/"
          className={`${styles.sliderNavButton} ${styles.sliderNavButtonRight}`}
          uk-slideshow-item="next"
        >
          <IconArrow className={`${styles.sliderArrow}`} />
        </a>
      </div>
      <div className={styles.text}>
        <h2 className={styles.titleFounders}>Основатели</h2>
        <p className={styles.descFounders}>
          Потребители учатся обобщать то, чему они научились. Поэтому
          рекламодатели иногда копи весьма успешную идею, которая была хорошо
          изучена потребителями. Например, очень успешная реклама Weston Tea
          Country для разных сортов чая привела к появлению DAEWOO Country для
          автодилеров и Cadbury Country для шоколадных батончиков.
        </p>
        <p className={styles.descFounders}>
          Если реклама предназначена для того, чтобы он узнал, то необходимо
          много повторений. Но рекламодатели должны быть осторожны, потому что
          слишком много повторений может прив к усталости потребителей, и
          сообщение может упасть на «уши».
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
        Если реклама предназначена для того, чтобы он узнал, то необходимо много
        повторений. рекламодатели должны быть осторожны, потому что слишком
        много повторений может привести к усталости потребителей, и сообщение
        может упасть на «уши».
      </p>
    </div>
  );
};

export default BlogDetails;
