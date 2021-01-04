import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './Products.scss';
import { parseText } from '../../../utils/helpers';
import { cookies } from '../../../utils/getCookies';

const ProductForOpt = ({ item, isToggled }) => {
  const [toggled, setToggled] = useState(isToggled);
  const [withPhoto, ShowWithPhoto] = useState(false);

  const classNameForAccordionItem = cx(styles.item, {
    'uk-open': toggled,
    [styles.activeProduct]: toggled,
  });

  const classNameForInfo = cx(styles.itemMainInfoSecond, {
    [styles.itemMainInfoSecondCanceled]: item.status === 'Отменен',
  });

  const classNameForLinkId = cx(styles.itemLinkId, {
    [styles.linkIdAfterRotate]: toggled,
  });

  return (
    <div className={classNameForAccordionItem}>
      <div className={styles.itemMainInfoWrapper}>
        <div className={styles.itemMainInfo}>
          <a
            className={classNameForLinkId}
            href="/"
            onClick={(e) => {
              e.preventDefault();
              setToggled(!toggled);
            }}
          >
            {withPhoto && (
              <img
                className={styles.imageOpt}
                src={item.img_link}
                alt={item.name}
              />
            )}
            {parseText(cookies, item.site_name, item.site_name_uk)}
          </a>
        </div>
        <p>{parseText(cookies, item.name, item.name_uk)}</p>
        <p>{item.price} грн</p>
      </div>
      <div
        hidden={!toggled}
        className={cx(styles.itemAddInfo, 'uk-accordion-content')}
      >
        <button
          type="button"
          className={cx(styles.withPhoto, {
            [styles.checked]: withPhoto,
          })}
          onClick={() => ShowWithPhoto(!withPhoto)}
        >
          {parseText(cookies, 'Показать с фото', 'Показати з фото')}
        </button>
        <p />
      </div>
    </div>
  );
};

ProductForOpt.propTypes = {
  item: PropTypes.object,
  isToggled: PropTypes.bool,
};

export default ProductForOpt;
