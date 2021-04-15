import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { cookies } from '../../utils/getCookies';
import { parseText, getCorrectWordCount } from '../../utils/helpers';
import { withResponse } from '../hoc/withResponse';
import styles from './ProfileOrderHeader.scss';

const ProfileOrderHeader = ({
  item,
  children,
  isToggled,
  isDesktopScreen,
  isMobileScreen,
  classNameWrapper,
  classNameActive,
  isWholesale
}) => {
  const [toggled, setToggled] = useState(isToggled);

  const classNameForAccordionItem = cx(styles.item, {
    'uk-open': toggled,
    [classNameActive]: toggled
  });

  const classNameForController = cx(
    cx(styles.itemController, 'uk-accordion-title'),
    {
      [styles.linkAfterRotateController]: toggled
    }
  );

  const classNameForLinkId = cx(styles.itemLinkId, {
    [styles.linkIdAfterRotate]: toggled,
    [styles.idWithArrow]: isWholesale
  });

  const classNameForStatusText = cx(styles.itemTextStatus, {
    [styles.itemDone]: item.status !== 'Отменен',
    [styles.itemCanceled]: item.status === 'Отменен'
  });

  const classNameForInfo = cx(styles.itemMainInfoSecond, {
    [styles.itemMainInfoSecondCanceled]: item.status === 'Отменен'
  });

  const time = item.create_date?.slice(0, 10);
  const hours = item.create_date?.slice(11, 19);

  const newDate = new Date(time).toLocaleString('ru', {
    day: 'numeric',
    month: 'long'
  });

  const newDateUA = new Date(time).toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'long'
  });

  return (
    <div className={classNameForAccordionItem}>
      {isMobileScreen && (
        <a
          className={classNameForLinkId}
          href="/"
          onClick={e => {
            e.preventDefault();
            setToggled(!toggled);
          }}
        >
          #{item.id}
        </a>
      )}
      <div className={styles.itemMainInfoWrapper}>
        <div className={styles.itemMainInfo}>
          {isDesktopScreen && (
            <a
              className={classNameForLinkId}
              href="/"
              onClick={e => {
                e.preventDefault();
                setToggled(!toggled);
              }}
            >
              #{item.id}
            </a>
          )}
          <p className={styles.itemDate}>
            {parseText(
              cookies,
              `${newDate} ${hours}` || '',
              `${newDateUA} ${hours}` || ''
            )}
          </p>
        </div>
        <div className={classNameForInfo}>
          <p className={styles.itemEvent}>
            {getCorrectWordCount(
              item.total_count,
              parseText(
                cookies,
                ['товар', 'товара', 'товаров'],
                ['товар', 'товара', 'товарів']
              )
            )}{' '}
            {item.total_amount} грн
          </p>
          <p className={classNameForStatusText}>
            {parseText(cookies, item.status, item.status_ua)}
          </p>
        </div>
      </div>
      {isDesktopScreen && (
        <a
          className={classNameForController}
          href="/"
          onClick={e => {
            e.preventDefault();
            setToggled(!toggled);
          }}
        >
          {parseText(cookies, 'Дополнительно', 'Додатково')}
        </a>
      )}
      <div
        hidden={!toggled}
        className={cx(
          styles.itemAddInfo,
          classNameWrapper,
          'uk-accordion-content'
        )}
      >
        {children}
      </div>
    </div>
  );
};

ProfileOrderHeader.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    create_date: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    total_amount: PropTypes.number,
    total_count: PropTypes.number
  }),
  children: PropTypes.node,
  isToggled: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
  isWholesale: PropTypes.bool,
  classNameWrapper: PropTypes.string,
  classNameActive: PropTypes.string
};

export default withResponse(ProfileOrderHeader);
