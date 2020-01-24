import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Accordion.scss';

const Accordion = ({
  title, children, count, toggled, setToggled,
}) => {
  const [itemToggled, setItemToggled] = useState(toggled);

  useEffect(() => {
    setItemToggled(toggled);
  }, [toggled]);

  const classNameWrapper = cx(styles.accordionItem, {
    [cx('uk-open', styles.redBackground)]: itemToggled,
  });

  const classNameForLink = cx(cx(styles.accordionButton, 'uk-accordion-title'), {
    [styles.linkAfter]: itemToggled,
  });

  return (
    <li
      className={classNameWrapper}
    >
      <a
        className={classNameForLink}
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setItemToggled(!itemToggled);
          if (setToggled) {
            setToggled(false);
          }
        }}
      >
        {title}
        {count || count === 0 ? (
          <span className={styles.accordionCount}>({count})</span>
        ) : null}
      </a>
      <div className="uk-accordion-content">{children}</div>
    </li>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  count: PropTypes.number,
  toggled: PropTypes.bool,
  setToggled: PropTypes.func,
};

export default Accordion;
