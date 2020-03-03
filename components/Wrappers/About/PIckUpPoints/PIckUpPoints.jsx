import React from 'react';
import GoogleMapReact from 'google-map-react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import Select from '../../../Select/Select';
import { data } from './data';
import styles from './PIckUpPoints.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../../../PickUpPointsSlider/PickUpPointsSlider'),
  { ssr: false },
);

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

const options = [
  { value: 'Dnepr', label: 'Днепр' },
  { value: 'Dnepr', label: 'Днепр' },
  { value: 'Dnepr', label: 'Днепр' },
  { value: 'Dnepr', label: 'Днепр' },
];

const PIckUpPoints = () => (
  <div className={styles.pickUpPoints}>
    <h3>Наши магазины</h3>
    <div className={styles.content}>
      <div className={styles.leftSide}>
        <Select
          classNameWrapper={styles.select}
          options={options}
          viewType="userForm"
        />
        <div className={styles.buttons}>
          {data.map(item => (
            <button className={styles.buttonsItem} key={item.id} type="button">
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
          <DynamicComponentWithNoSSRSlider />
          <div className={styles.times}>
            <h6>Время работы:</h6>
            <ul className={styles.timesList}>
              <li className={styles.timesItem}>Пн. 10:00 — 21:00</li>
              <li className={styles.timesItem}>Вт. 10:00 — 21:00</li>
              <li className={styles.timesItem}>Ср. 10:00 — 21:00</li>
              <li className={styles.timesItem}>Чт. 10:00 — 21:00</li>
              <li className={styles.timesItem}>Пт. 10:00 — 21:00</li>
              <li className={styles.timesItem}>Сб. 10:00 — 21:00</li>
              <li className={styles.timesItem}>Вс. Выходной</li>
            </ul>
          </div>
        </div>
        <Map />
      </div>
    </div>
  </div>
);

export default PIckUpPoints;
