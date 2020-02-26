import React, { useState, useEffect, useRef } from 'react';
import GoogleMapReact from 'google-map-react';
import { data } from './data';
import styles from './PIckUpPoints.scss';
import IconArrow from '../../../public/svg/Group621.svg';
import UIKit from '../../../public/uikit/uikit';

const Map = () => (
  <div className={styles.map}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyDb8D7DDVkbXbN03KeDk0TFmBpK24NcQjg' }}
      defaultCenter={{
        lat: 59.955413,
        lng: 30.337844,
      }}
      defaultZoom={18}
    >
      <img
        src="/images/location-pin.png"
        alt="marker"
        lat={59.955413}
        lng={30.337844}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </GoogleMapReact>
  </div>
);

const PIckUpPoints = () => {
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
    <div className={styles.pickUpPoints}>
      <h2 className={styles.title}>Наши магазины</h2>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <ul uk-accordion="multiple: true">
            <li className={styles.select}>
              <input type="checkbox" className={styles.field} id="select" />
              <label
                htmlFor="select"
                className={`${styles.selectLink} uk-accordion-title`}
              >
                Днепр
              </label>
              <div className="uk-accordion-content">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </li>
          </ul>
          <div className={styles.buttons}>
            {data.map(item => (
              <button
                className={styles.buttonsItem}
                key={item.id}
                type="button"
              >
                <span className={styles.address}>{item.address}</span>
                <span className={styles.addressDetails}>
                  {item.addressDetails}
                </span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.rightSide}>
          <div className={styles.contentTimeInfo}>
            <div
              ref={value}
              uk-slideshow="autoplay: true, ratio: 7:3, pause-on-hover: true"
              className={styles.slider}
            >
              <ul className={`${styles.list} uk-slideshow-items`}>
                <li className={styles.item}>
                  <img
                    className={styles.image}
                    src="/images/harkovfrancuzskiybulvar1.png"
                    alt="harkovfrancuzskiybulvar"
                  />
                </li>
                <li className={styles.item}>
                  <img
                    className={styles.image}
                    src="/images/harkovfrancuzskiybulvar1.png"
                    alt="harkovfrancuzskiybulvar"
                  />
                </li>
                <li className={styles.item}>
                  <img
                    className={styles.image}
                    src="/images/harkovfrancuzskiybulvar1.png"
                    alt="harkovfrancuzskiybulvar"
                  />
                </li>
              </ul>
              <div className={styles.navBar}>
                <a
                  href="/"
                  className={styles.navButton}
                  uk-slideshow-item="previous"
                >
                  <IconArrow
                    className={`${styles.arrow} ${styles.arrowLeft}`}
                  />
                </a>
                <p className={styles.indexIndicator}>
                  {index + 1}/{sliderLength}
                </p>
                <a
                  href="/"
                  className={styles.navButton}
                  uk-slideshow-item="next"
                >
                  <IconArrow className={`${styles.arrow}`} />
                </a>
              </div>
            </div>
            <div className={styles.times}>
              <h2 className={styles.timesTitle}>Время работы:</h2>
              <div className={styles.timesWrapper}>
                <ul className={styles.timesList}>
                  <li className={styles.timesItem}>Пн. 10:00 — 21:00</li>
                  <li className={styles.timesItem}>Вт. 10:00 — 21:00</li>
                  <li className={styles.timesItem}>Ср. 10:00 — 21:00</li>
                  <li className={styles.timesItem}>Чт. 10:00 — 21:00</li>
                </ul>
                <ul className={styles.timesList}>
                  <li className={styles.timesItem}>Пт. 10:00 — 21:00</li>
                  <li className={styles.timesItem}>Сб. 10:00 — 21:00</li>
                  <li className={styles.timesItem}>Вс. Выходной</li>
                </ul>
              </div>
            </div>
          </div>
          <Map />
        </div>
      </div>
    </div>
  );
};

export default PIckUpPoints;
