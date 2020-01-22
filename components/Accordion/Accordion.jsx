import React, { useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import styles from './Accordion.scss';

const Accordion = ({
  title, children, count, shouldOpenAccordionItem,
}) => {
  const item = useRef(null);
  const link = useRef(null);

  const classNameWrapper = cx(styles.accordionItem, {
    [cx('uk-open', styles.redBackground)]: shouldOpenAccordionItem,
  });

  return (
    <>
      <li
        ref={item}
        className={classNameWrapper}
      >
        <a
          className={cx(styles.accordionButton, 'uk-accordion-title')}
          href="/"
          ref={link}
          onClick={(e) => {
            e.preventDefault();
            item.current.classList.toggle(styles.redBackground);
            link.current.classList.toggle(styles.linkAfter);
          }}
        >
          {title}
          {count || count === 0 ? (
            <span className={styles.accordionCount}>({count})</span>
          ) : null}
        </a>
        <div className="uk-accordion-content">{children}</div>
      </li>
    </>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  count: PropTypes.number,
  shouldOpenAccordionItem: PropTypes.bool,
};

export default Accordion;
