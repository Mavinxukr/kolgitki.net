import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Select from '../../../Select/Select';
import { getCitiesShops } from '../../../../utils/helpers';
import { getShopByCity } from '../../../../services/order';
import { cookies } from '../../../../utils/getCookies';
import styles from './PIckUpPoints.scss';

const getSchedule = (obj) => {
  const arrTimes = [];
  _.forIn(obj, (key, value) => arrTimes.push({
    day: value,
    time: key,
  }));
  return arrTimes;
};

const Map = ({ lat, lng }) => (
  <div className={styles.map}>
    <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyDb8D7DDVkbXbN03KeDk0TFmBpK24NcQjg' }}
      defaultCenter={{
        lat: 30.45345,
        lng: 53.8345843,
      }}
      center={{
        lat: +lat,
        lng: +lng,
      }}
      defaultZoom={18}
    >
      <img
        src="/images/location-pin.png"
        alt="marker"
        lat={+lat}
        lng={+lng}
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      />
    </GoogleMapReact>
  </div>
);

const PIckUpPoints = () => {
  const [arrCities, setArrCities] = useState([]);
  const [arrPoints, setArrPoints] = useState([]);
  const [selectedShop, setSelectedShop] = useState(null);

  useEffect(() => {
    getCitiesShops(setArrCities);
    if (cookies.get('location_city')) {
      getShopByCity({ city: cookies.get('location_city') }).then(response => setArrPoints(response.data));
    }
  }, []);

  return (
    <div className={styles.pickUpPoints}>
      <h3>Наши магазины</h3>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <Select
            classNameWrapper={styles.select}
            options={arrCities}
            viewType="userForm"
            placeholder="Введите город"
            onChangeCustom={(e) => {
              getShopByCity({ city: e.label }).then(response => setArrPoints(response.data));
            }}
            defaultInputValue={cookies.get('location_city') || ''}
          />
          <div className={styles.buttons}>
            {arrPoints.length > 0 ? (
              arrPoints.map((item) => {
                const classNameForButton = cx(styles.buttonsItem, {
                  [styles.buttonItemSelected]:
                    selectedShop && selectedShop.id === item.id,
                });

                return (
                  <button
                    className={classNameForButton}
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setSelectedShop(item);
                    }}
                  >
                    <span className={styles.address}>{item.name}</span>
                    <span className={styles.addressDetails}>
                      {item.address}
                    </span>
                  </button>
                );
              })
            ) : (
              <p className={styles.error}>магазинов пока не найдено</p>
            )}
          </div>
        </div>
        <div className={styles.rightSide}>
          {selectedShop && (
            <div>
              <h6>Время работы:</h6>
              <ul className={styles.timesList}>
                {getSchedule(selectedShop.schedule).map((item, index) => (
                  <li key={index} className={styles.timesItem}>
                    {`${item.day}. ${item.time}`}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Map
            lat={selectedShop && selectedShop.lat}
            lng={selectedShop && selectedShop.long}
          />
        </div>
      </div>
    </div>
  );
};

Map.propTypes = {
  lat: PropTypes.string,
  lng: PropTypes.string,
};

export default PIckUpPoints;
