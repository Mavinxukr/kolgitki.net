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
        {item.id}
      </a>
      <div className={styles.itemMainInfo}>
        <p className={styles.itemDate}>
          {item.created_at}
        </p>
        <p className={styles.itemEvent}>
          {item.description || ''}
        </p>
        <p className={styles.itemDone}>{item.status}</p>
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
  }),
  isIdWithArrow: PropTypes.bool,
  children: PropTypes.node,
  isToggled: PropTypes.bool,
};

export default ProfileOrderHeader;
