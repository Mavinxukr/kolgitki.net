import React from 'react';
import PropTypes from 'prop-types';
import styles from './Recovery.scss';

const Recovery = ({ exchangeData }) => (
  <div className={styles.recovery}>
    {exchangeData.map(item => (
      <div key={item.id}>
        <h3>{item.name}</h3>
        <div className={styles.mainIfo}>
          <div className={styles.iconBlock}>
            <img src={item.image_link} alt={item.image_link} />
          </div>
          <p className={styles.mainInfoDesc}>
            Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был
            максимально приятным, и разработали максимально простую и удобную
            процедуру возврата.
          </p>
        </div>
        <div
          className={styles.detailsTitle}
          dangerouslySetInnerHTML={{ __html: item.description }}
        />
      </div>
    ))}
  </div>
);

Recovery.propTypes = {
  exchangeData: PropTypes.arrayOf(PropTypes.object),
};

export default Recovery;
