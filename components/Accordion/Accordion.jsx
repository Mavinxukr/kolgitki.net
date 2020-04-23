import React, { useState, useEffect } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Accordion.scss';

const Accordion = ({
  title,
  children,
  count,
  toggled,
  setToggled,
  classNameWrapper,
  addClassNameWrapper,
  isSortBlock,
  isMobileFilter,
}) => {
  const [itemToggled, setItemToggled] = useState(toggled);

  useEffect(() => {
    setItemToggled(toggled);
  }, [toggled]);

  const classNameForAccordion = cx(cx(styles.accordionItem, classNameWrapper), {
    [cx('uk-open', styles.redBackground, addClassNameWrapper)]: itemToggled,
    [styles.accordionItemActiveMobileFilter]: itemToggled && isMobileFilter,
  });

  const classNameForTextButton = cx(
    styles.textButton,
    {
      [styles.iconArrowActive]: itemToggled,
      [styles.iconArrowMobileFilter]: isMobileFilter,
      [styles.iconArrowMobileFilterActive]: isMobileFilter && itemToggled,
    },
  );

  const classNameForCount = cx(styles.accordionCount, {
    [styles.accordionCountSort]: isSortBlock,
  });

  return (
    <li className={classNameForAccordion}>
      <a
        className={cx(styles.accordionButton, 'uk-accordion-title')}
        href="/"
        onClick={(e) => {
          e.preventDefault();
          setItemToggled(!itemToggled);
          if (setToggled) {
            setToggled(false);
          }
        }}
      >
        <span className={classNameForTextButton}>{title}</span>
        {count || count === 0 ? (
          <span className={classNameForCount}>
            {(isSortBlock && count) || `(${count})`}
          </span>
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
  classNameWrapper: PropTypes.string,
  addClassNameWrapper: PropTypes.string,
  isSortBlock: PropTypes.bool,
  isMobileFilter: PropTypes.bool,
};

export default Accordion;
