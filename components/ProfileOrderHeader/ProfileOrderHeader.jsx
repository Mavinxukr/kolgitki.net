import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { getCorrectWordCount } from '../../utils/helpers';
import { withResponse } from '../hoc/withResponse';
import styles from './ProfileOrderHeader.scss';

const ProfileOrderHeader = ({
  item, children, isToggled, isDesktopScreen, isMobileScreen,
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

  const classNameForLinkId = cx(cx(styles.itemLinkId, 'uk-accordion-title'), {
    [styles.linkIdAfterRotate]: toggled,
  });

  const classNameForStatusText = cx(styles.itemTextStatus, {
    [styles.itemDone]: item.status !== 'Отменен',
    [styles.itemCanceled]: item.status === 'Отменен',
  });

  const classNameForInfo = cx(styles.itemMainInfoSecond, {
    [styles.itemMainInfoSecondCanceled]: item.status === 'Отменен',
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
              }}
            >
              #{item.id}
            </a>
          )}
          <p className={styles.itemDate}>{item.created_at}</p>
        </div>
        <div className={classNameForInfo}>
          <p className={styles.itemEvent}>
            {getCorrectWordCount(item.total_count, [
              'товар',
              'товара',
              'товаров',
            ])} {item.total_amount} ₴
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
          Дополнительно
        </a>
      )}
      <div className={cx(styles.itemAddInfo, 'uk-accordion-content')}>
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
