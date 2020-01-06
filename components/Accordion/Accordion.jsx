import React, { useRef } from 'react';
import styles from './Accordion.scss';

const Accordion = ({
  title, id, children, count,
}) => {
  const item = useRef(null);
  const link = useRef(null);

  return (
    <>
      <li ref={item} className={styles.accordionItem} id={id}>
        <a
          className={`${styles.accordionButton} uk-accordion-title`}
          href="/"
          ref={link}
          onClick={(e) => {
            e.preventDefault();
            item.current.classList.toggle(styles.redBackground);
            link.current.classList.toggle(styles.linkAfter);
          }}
        >
          {title}
          {count ? (
            <span className={styles.accordionCount}>({count})</span>
          ) : null}
        </a>
        <div className="uk-accordion-content">{children}</div>
      </li>
    </>
  );
};

export default Accordion;
