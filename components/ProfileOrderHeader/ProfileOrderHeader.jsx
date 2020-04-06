import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './ProfileOrderHeader.scss';

const ProfileOrderHeader = ({
  item, children, isToggled,
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

  const classNameForStatusText = cx(styles.itemTextStatus, {
    [styles.itemDone]: item.status !== 'Отменен',
    [styles.itemCanceled]: item.status === 'Отменен',
  });

  return (
    <li className={classNameForAccordionItem}>
      <a
        className={styles.itemLinkId}
        href="/"
        onClick={(e) => {
          e.preventDefault();
        }}
      >
        #{item.id}
      </a>
      <div className={styles.itemMainInfo}>
        <p className={styles.itemDate}>{item.created_at}</p>
        <p className={styles.itemEvent}>{item.total_count} Товара {item.total_amount} ₴</p>
        <p className={classNameForStatusText}>{item.status}</p>
      </div>
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
};

export default ProfileOrderHeader;
