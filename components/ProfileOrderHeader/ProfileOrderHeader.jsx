import React, { useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import styles from './ProfileOrderHeader.scss';

const ProfileOrderHeader = ({
  item, children, isIdWithArrow, isToggled,
}) => {
  const [toggled, setToggled] = useState(isToggled);

  const classNameForId = cx(styles.itemLinkId, {
    [cx(styles.idWithArrow, 'uk-accordion-title')]: isIdWithArrow,
  });

  const classNameForAccordionItem = cx(styles.item, {
    'uk-open': toggled,
  });

  const classNameLinkIdAfter = cx(classNameForId, {
    [styles.linkAfterRotateLinkId]: toggled,
  });

  const classNameForController = cx(cx(styles.itemController, 'uk-accordion-title'), {
    [styles.linkAfterRotateController]: toggled,
  });

  return (
    <li className={classNameForAccordionItem}>
      <a
        className={classNameLinkIdAfter}
        href="/"
        onClick={(e) => {
          e.preventDefault();
          if (isIdWithArrow) {
            setToggled(!toggled);
          }
        }}
      >
        {item.idOrder}
      </a>
      <div className={styles.itemMainInfo}>
        <p className={styles.itemDate}>
          {item.date} <span className={styles.itemTime}>{item.time}</span>
        </p>
        <p className={styles.itemEvent}>
          {item.event}{' '}
          <span className={styles.itemEventPrice}>{item.eventPrice}</span>
        </p>
        {item.done ? (
          <p className={styles.itemDone}>Выполнен</p>
        ) : (
          <p className={styles.itemCanceled}>Отменен</p>
        )}
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
    idOrder: PropTypes.number,
    date: PropTypes.string,
    time: PropTypes.string,
    event: PropTypes.string,
    eventPrice: PropTypes.number,
    done: PropTypes.bool,
  }),
  isIdWithArrow: PropTypes.bool,
  children: PropTypes.node,
  isToggled: PropTypes.bool,
};

export default ProfileOrderHeader;
