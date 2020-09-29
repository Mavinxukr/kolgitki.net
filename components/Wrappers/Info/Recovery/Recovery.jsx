import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import styles from './Recovery.scss';

const Recovery = ({ exchangeData }) => {
  const [screenWidth, setScreenWidth] = useState(0);

  useEffect(() => {
    setScreenWidth(window.innerWidth);
  }, []);

  return (
    <div className={styles.recovery}>
      {exchangeData.map(item => (
        <div key={item.id}>
          <h3>{parseText(cookies, item.name, item.name_ua)}</h3>
          <div className={styles.mainIfo}>
            {screenWidth > 768 && (
              <div className={styles.iconBlock}>
                <img
                  className={styles.recoveryImage}
                  src={item.image_link}
                  alt={item.image_link}
                />
              </div>
            )}
            <p className={styles.mainInfoDesc}>
              {parseText(
                cookies,
                'Мы делаем все для того, чтобы ваш опыт онлайн-шопинга был максимально приятным, и разработали максимально простую и удобную процедуру возврата.',
                'Ми робимо все для того, щоб ваш досвід онлайн-шопінгу був максимально приємним, і розробили максимально просту і зручну процедуру повернення.',
              )}
            </p>
          </div>
          {screenWidth > 768 ? (
            <div
              className={styles.detailsTitle}
              dangerouslySetInnerHTML={{
                __html: parseText(
                  cookies,
                  item.description,
                  item.description_ua,
                ),
              }}
            />
          ) : (
            <div
              className={styles.detailsTitle}
              dangerouslySetInnerHTML={{
                __html: parseText(
                  cookies,
                  item.mobile_description,
                  item.mobile_description_ua,
                ),
              }}
            />
          )}
        </div>
      ))}
    </div>
  );
};
Recovery.propTypes = {
  exchangeData: PropTypes.arrayOf(PropTypes.object),
};

export default Recovery;
