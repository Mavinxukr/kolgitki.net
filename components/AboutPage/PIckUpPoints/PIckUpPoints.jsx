import React from 'react';
import { data } from './data';
import styles from './PIckUpPoints.scss';
// import GoogleMapReact from 'google-map-react';

const PIckUpPoints = () => (
  <div className={styles.pickUpPoints}>
    <h2 className={styles.title}>Наши магазины</h2>
    <div className={styles.content}>
      <div>
        <ul uk-accordion="multiple: true">
          <li className={styles.select}>
            <input type="checkbox" className={styles.field} id="select" />
            <label htmlFor="select" className={`${styles.selectLink} uk-accordion-title`}>Днепр</label>
            <div className="uk-accordion-content">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                dolore magna aliqua.
              </p>
            </div>
          </li>
        </ul>
        <div className={styles.buttons}>
          {
            data.map(item => (
              <button className={styles.buttonsItem} key={item.id} type="button">
                <span className={styles.address}>{item.address}</span>
                <span className={styles.addressDetails}>{item.addressDetails}</span>
              </button>
            ))
          }
        </div>
      </div>
    </div>
  </div>
);

// const Map = () => (
//   <div style={{ height: '100vh', width: '100%' }}>
//     <GoogleMapReact
//       bootstrapURLKeys={{ key: 'AIzaSyDb8D7DDVkbXbN03KeDk0TFmBpK24NcQjg' }}
//       defaultCenter={{
//         lat: 59.955413,
//         lng: 30.337844,
//       }}
//       defaultZoom={18}
//     >
//       <img
//         src="/images/location-pin.png"
//         alt="marker"
//         lat={59.955413}
//         lng={30.337844}
//         style={{
//           transform: 'translate(-50%, -50%)',
//         }}
//       />
//     </GoogleMapReact>
//   </div>
// );

export default PIckUpPoints;
