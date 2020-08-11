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
}) => {
  const [toggled, setToggled] = useState(isToggled);

  const classNameForAccordionItem = cx(styles.item, {
    'uk-open': toggled,
  });

  const classNameForController = cx(
    cx(styles.itemController, 'uk-accordion-title'),
    {
      [styles.linkAfterRotateController]: toggled,
    },
  );

  const classNameForLinkId = cx(styles.itemLinkId, {
    [styles.linkIdAfterRotate]: toggled,
  });

  const classNameForStatusText = cx(styles.itemTextStatus, {
    [styles.itemDone]: item.status !== 'Отменен',
    [styles.itemCanceled]: item.status === 'Отменен',
  });

  const classNameForInfo = cx(styles.itemMainInfoSecond, {
    [styles.itemMainInfoSecondCanceled]: item.status === 'Отменен',
  });

  const time = item.created_at.slice(0, 10);
  const hours = item.created_at.slice(11, 16);

  const newDate = new Date(time).toLocaleString('ru', {
    day: 'numeric',
    month: 'long',
  });

  const newDateUA = new Date(time).toLocaleString('uk-UA', {
    day: 'numeric',
    month: 'long',
  });

  return (
    <li className={classNameForAccordionItem}>
      {isMobileScreen && (
        <a
          className={classNameForLinkId}
          href="/"
          onClick={(e) => {
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
              className={styles.itemLinkId}
              href="/"
              onClick={(e) => {
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
              `${newDateUA} ${hours}` || '',
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
                ['товар', 'товара', 'товарів'],
              ),
            )}{' '}
            {item.total_amount} ₴
          </p>
          <p className={classNameForStatusText}>{item.status}</p>
        </div>
      </div>
      {isDesktopScreen && (
        <a
          className={classNameForController}
          href="/"
          onClick={(e) => {
            e.preventDefault();
            setToggled(!toggled);
          }}
        >
          {parseText(cookies, 'Дополнительно', 'Додатково')}
        </a>
      )}
      <div hidden={!toggled} className={cx(styles.itemAddInfo, 'uk-accordion-content')}>
        {children}
      </div>
    </li>
  );
};

ProfileOrderHeader.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number,
    created_at: PropTypes.string,
    description: PropTypes.string,
    status: PropTypes.string,
    total_amount: PropTypes.number,
    total_count: PropTypes.number,
  }),
  children: PropTypes.node,
  isToggled: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
  isMobileScreen: PropTypes.bool,
};

export default withResponse(ProfileOrderHeader);
