import React, { useRef, useEffect, useState } from 'react';
import ReactPlayer from 'react-player';
import Styles from './BlogInfoComponent.module.scss';
import IconArrow from '../../../assets/svg/Group 621.svg';
import UIKit from '../../../public/uikit/uikit';

const BlogInfoComponent = () => {
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
    <div className={Styles.BlogInfoComponent}>
      <div className={Styles.BlogInfoComponent__MainText}>
        <h2 className={Styles.BlogInfoComponent__Title}>Ежегодный показ колготок в Вене</h2>
        <div className={Styles.BlogInfoComponent__TagsBlock}>
          <div className={Styles.BlogInfoComponent__Tags}>
            <span className={Styles.BlogInfoComponent__TagNews}>#Новости</span>
            <span className={Styles.BlogInfoComponent__TagAdvice}>#Советы</span>
            <span className={Styles.BlogInfoComponent__TagArticle}>#Статьи</span>
          </div>
          <p className={Styles.BlogInfoComponent__Date}>21.10.2019</p>
        </div>
        <h2 className={Styles.BlogInfoComponent__TitleHistory}>История</h2>
        <p className={Styles.BlogInfoComponent__DescHistory}>
          Рекламодатели изучают, как люди учатся, чтобы они могли «научить»
          их реагировать на их рекламу. Они хотят, чтобы нам было интересно,
          попробовать что-то, а затем сделать это снова. Это элементы обучения:
          интерес, опыт и повторение.
        </p>
      </div>
      <div ref={value} uk-slideshow="autoplay: true, ratio: 7:3, pause-on-hover: true" className={Styles.BlogInfoComponent__Slider}>
        <ul className={`${Styles.BlogInfoComponent__SliderList} uk-slideshow-items`}>
          <li className={Styles.BlogInfoComponent__SliderItem}>
            <img className={Styles.BlogInfoComponent__SliderImage} src="/images/858x540.png" alt="image1" />
          </li>
          <li className={Styles.BlogInfoComponent__SliderItem}>
            <img className={Styles.BlogInfoComponent__SliderImage} src="/images/858x540.png" alt="image2" />
          </li>
          <li className={Styles.BlogInfoComponent__SliderItem}>
            <img className={Styles.BlogInfoComponent__SliderImage} src="/images/858x540.png" alt="image3" />
          </li>
        </ul>
        <a href="/" className={`${Styles.BlogInfoComponent__SliderNavButton} ${Styles.BlogInfoComponent__SliderNavButtonLeft}`} uk-slideshow-item="previous">
          <IconArrow className={`${Styles.BlogInfoComponent__SliderArrow} ${Styles.BlogInfoComponent__ArrowLeft}`} />
        </a>
        <p className={Styles.BlogInfoComponent__SliderIndexIndicator}>{index + 1}/{sliderLength}</p>
        <a href="/" className={`${Styles.BlogInfoComponent__SliderNavButton} ${Styles.BlogInfoComponent__SliderNavButtonRight}`} uk-slideshow-item="next">
          <IconArrow className={`${Styles.BlogInfoComponent__SliderArrow}`} />
        </a>
      </div>
      <div className={Styles.BlogInfoComponent__MainText}>
        <h2 className={Styles.BlogInfoComponent__TitleFounders}>Основатели</h2>
        <p className={Styles.BlogInfoComponent__DescFounders}>
          Потребители учатся обобщать то, чему они научились. Поэтому
          рекламодатели иногда копи весьма успешную идею, которая была
          хорошо изучена потребителями. Например, очень успешная реклама
          Weston Tea Country для разных сортов чая привела к появлению DAEWOO
          Country для автодилеров и Cadbury Country для шоколадных батончиков.
        </p>
        <p className={Styles.BlogInfoComponent__DescFounders}>
          Если реклама предназначена для того, чтобы он узнал,
          то необходимо много повторений. Но рекламодатели должны
          быть осторожны, потому что слишком много повторений может прив
          к усталости потребителей, и сообщение может упасть на «уши».
        </p>
      </div>
      <div className={Styles.BlogInfoComponent__Player}>
        <ReactPlayer width="100%" height="100%" url="https://youtu.be/MRRM6O40hWs" controls />
      </div>
      <p className={Styles.BlogInfoComponent__DescSeo}>
        Если реклама предназначена для того, чтобы он узнал,
        то необходимо много повторений. рекламодатели должны быть
        осторожны, потому что слишком много повторений может привести
        к усталости потребителей, и сообщение может упасть на «уши».
      </p>
    </div>
  );
};

export default BlogInfoComponent;
