import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react';
import _ from 'lodash';
import cx from 'classnames';
import PropTypes from 'prop-types';
import Select from '../../../Select/Select';
import { getCitiesShops, parseText } from '../../../../utils/helpers';
import { getShopByCity } from '../../../../services/order';
import { withResponse } from '../../../hoc/withResponse';
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

const ButtonPoint = ({
  item,
  selectedShop,
  setSelectedShop,
  classNameWrapper,
}) => {
  const classNameForButton = cx(classNameWrapper, {
    [styles.buttonItemSelected]: selectedShop && selectedShop.id === item.id,
  });

  return (
    <button
      className={classNameForButton}
      type="button"
      onClick={() => {
        setSelectedShop(item);
      }}
    >
      <span className={styles.address}>{item.name}</span>
      <span
        className={styles.addressDetails}
        dangerouslySetInnerHTML={{
          __html: item.address,
        }}
      />
    </button>
  );
};

const MainInfo = ({ selectedShop }) => (
  <div className={styles.rightSide}>
    {selectedShop && (
      <div className={styles.shopTimeWrapper}>
        <h6 className={styles.timeTitle}>
          {parseText(cookies, 'Время работы:', 'Час роботи:')}
        </h6>
        <ul className={styles.timesList}>
          {getSchedule(selectedShop.schedule).map((item, index) => (
            <li key={index} className={styles.timesItem}>
              {`${item.day} ${item.time}`}
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
);

const PIckUpPoints = ({ isDesktopScreen }) => {
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
      <h3>{parseText(cookies, 'Наши магазины', 'Наші магазини')}</h3>
      <div className={styles.content}>
        <div className={styles.leftSide}>
          <Select
            isPickUpPointsMobile
            classNameWrapper={styles.select}
            options={arrCities}
            viewType="userForm"
            placeholder={parseText(cookies, 'Введите город', 'Введіть місто')}
            onChangeCustom={(e) => {
              getShopByCity({ city: e.label }).then(response => setArrPoints(response.data));
            }}
            defaultInputValue={cookies.get('location_city') || ''}
          />
          {(isDesktopScreen && (
            <div className={styles.buttons}>
              {arrPoints.length > 0 ? (
                arrPoints.map(item => (
                  <ButtonPoint
                    item={item}
                    selectedShop={selectedShop}
                    setSelectedShop={setSelectedShop}
                    key={item.id}
                    classNameWrapper={styles.buttonsItem}
                  />
                ))
              ) : (
                  <p className={styles.error}>
                    {parseText(
                      cookies,
                      'магазинов пока не найдено',
                      'магазинів поки не знайдено',
                    )}
                  </p>
                )}
            </div>
          )) || (
              <ul className={styles.accordion} uk-accordion="multiple: true">
                {arrPoints.length > 0 ? (
                  arrPoints.map(item => (
                    <li>
                      <ButtonPoint
                        item={item}
                        selectedShop={selectedShop}
                        setSelectedShop={setSelectedShop}
                        key={item.id}
                        classNameWrapper={cx(
                          styles.buttonsItem,
                          'uk-accordion-title',
                        )}
                      />
                      <div className="uk-accordion-content">
                        <MainInfo selectedShop={item} />
                      </div>
                    </li>
                  ))
                ) : (
                    <p className={styles.error}>
                      {parseText(
                        cookies,
                        'магазинов пока не найдено',
                        'магазинів поки не знайдено',
                      )}
                    </p>
                  )}
              </ul>
            )}
        </div>
        {isDesktopScreen && <MainInfo selectedShop={selectedShop} />}
      </div>
    </div>
  );
};

Map.propTypes = {
  lat: PropTypes.string,
  lng: PropTypes.string,
};

ButtonPoint.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    address: PropTypes.string,
    id: PropTypes.number,
  }),
  selectedShop: PropTypes.shape({
    id: PropTypes.number,
  }),
  setSelectedShop: PropTypes.func,
  classNameWrapper: PropTypes.string,
};

MainInfo.propTypes = {
  selectedShop: PropTypes.shape({
    schedule: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string,
        time: PropTypes.string,
      }),
    ),
    lat: PropTypes.string,
    long: PropTypes.string,
  }),
};

PIckUpPoints.propTypes = {
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(PIckUpPoints);
