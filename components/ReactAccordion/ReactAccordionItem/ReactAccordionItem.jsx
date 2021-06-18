import React, { useState } from 'react';
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemState,
  AccordionItemPanel
} from 'react-accessible-accordion';
import '../ReactAccordion.css';
import cx from 'classnames';
import classes from '../ReactAccordion.scss';

export const ReactAccordionItem = ({
  uuid,
  heading,
  content,
  accordionItemClasses,
  accordionItemClassesActive,
  accordionHeadingClasses,
  accordionButtonClasses,
  accordionPanelClasses
}) => {
  const [opening, setOpening] = useState(false);
  return (
    <AccordionItem
      uuid={uuid}
      className={cx(classes.accordion_item, accordionItemClasses, {
        [accordionItemClassesActive]: opening
      })}
    >
      <AccordionItemHeading
        className={cx(classes.accordion_item__heading, accordionHeadingClasses)}
      >
        <AccordionItemButton
          className={cx(classes.accordion_item__button, accordionButtonClasses)}
        >
          {heading}
          <AccordionItemState>
            {({ expanded }) => setOpening(expanded)}
          </AccordionItemState>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel
        className={cx(classes.accordion_item__panel, accordionPanelClasses)}
      >
        {content}
      </AccordionItemPanel>
    </AccordionItem>
  );
};
