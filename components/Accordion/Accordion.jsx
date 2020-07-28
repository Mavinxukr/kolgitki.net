import React, { useState, useEffect, useRef } from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import { withResponse } from '../hoc/withResponse';
import styles from './Accordion.scss';

const Accordion = ({
  title,
  titleUk,
  children,
  count,
  toggled,
  setToggled,
  classNameWrapper,
  addClassNameWrapper,
  isSortBlock,
  isMobileFilter,
  isFooterNav,
  isMobileFilterGiftBackets,
  isProductAccordion,
  linkValue,
  isDesktopScreen,
  setIndexActive,
  isCurrentAccordionActive,
  isNotActiveScroll,
}) => {
  const [itemToggled, setItemToggled] = useState(toggled);

  const accordionRef = useRef(null);

  useEffect(() => {
    setItemToggled(toggled);
  }, [toggled]);

  const classNameForAccordion = cx(cx(styles.accordionItem, classNameWrapper), {
    [cx('uk-open', addClassNameWrapper)]:
      isCurrentAccordionActive || itemToggled,
    [styles.noBorder]:
      (isCurrentAccordionActive || itemToggled) && !isProductAccordion,
    [styles.redBackground]:
      !isFooterNav
      && !isMobileFilterGiftBackets
      && (isCurrentAccordionActive || itemToggled)
      && isProductAccordion && isDesktopScreen,
    [styles.accordionItemActiveMobileFilter]:
      (isCurrentAccordionActive || itemToggled) && isMobileFilter,
    [styles.accordionItemForGifts]: isMobileFilterGiftBackets,
    [styles.accordionItemForProduct]: isProductAccordion && !isDesktopScreen,
    [styles.accordionItemForProductActive]:
      isProductAccordion
      && (isCurrentAccordionActive || itemToggled)
      && !isDesktopScreen,
  });

  const classNameForTextButton = cx(styles.textButton, {
    [styles.iconArrowActive]:
      (isCurrentAccordionActive || itemToggled) && !count,
    [styles.iconArrowMobileFilter]: isMobileFilter,
    [styles.iconArrowMobileFilterActive]:
      isMobileFilter && (isCurrentAccordionActive || itemToggled),
  });

  const classNameForCount = cx(styles.accordionCount, {
    [styles.accordionCountSort]: isSortBlock,
  });

  return (
    <li className={classNameForAccordion} ref={accordionRef}>
      <a
        className={cx(styles.accordionButton, 'uk-accordion-title', {
          [styles.accordionButtonWithBorder]:
            isFooterNav && (isCurrentAccordionActive || itemToggled),
        })}
        href="/"
        onClick={(e) => {
          e.preventDefault();
          if (setIndexActive) {
            setIndexActive();
          } else {
            setItemToggled(!itemToggled);
          }
          if (setToggled) {
            setToggled(false);
          }
          if (!isNotActiveScroll) {
            setTimeout(() => {
              const top = accordionRef.current.getBoundingClientRect().top;
              window.scroll({
                top: document.body.pageYOffset / 2 + top,
                left: 0,
                behavior: 'smooth',
              });
            }, 200);
          }
        }}
      >
        <span className={classNameForTextButton}>
          {parseText(cookies, title, titleUk)}
          {count || count === 0 ? (
            <span className={classNameForCount}>
              {(isSortBlock && count) || `(${count})`}
            </span>
          ) : null}
        </span>
        {linkValue && <span className={styles.linkValue}>{linkValue}</span>}
      </a>
      <div className="uk-accordion-content">{children}</div>
    </li>
  );
};

Accordion.propTypes = {
  title: PropTypes.string,
  titleUk: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  count: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  toggled: PropTypes.bool,
  setToggled: PropTypes.func,
  classNameWrapper: PropTypes.string,
  addClassNameWrapper: PropTypes.string,
  isSortBlock: PropTypes.bool,
  isMobileFilter: PropTypes.bool,
  isFooterNav: PropTypes.bool,
  isMobileFilterGiftBackets: PropTypes.bool,
  isProductAccordion: PropTypes.bool,
  isDesktopScreen: PropTypes.bool,
  linkValue: PropTypes.string,
  setIndexActive: PropTypes.func,
  isCurrentAccordionActive: PropTypes.bool,
  isNotActiveScroll: PropTypes.bool,
};

export default withResponse(Accordion);
