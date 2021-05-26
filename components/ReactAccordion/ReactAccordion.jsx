import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel
} from 'react-accessible-accordion';
import './ReactAccordion.css';
import cx from 'classnames';
import classes from './ReactAccordion.scss';

// allowMultipleExpanded: boolean [true - элементы "НЕ" сворачиваются при открытии других]
// allowZeroExpanded: boolean [true - можно свернуть все элементы]
// preExpanded: string[] [перечень открытых элементов при рэндеренге компонента]
// accordionOnChange: function [кастомный эвент]
export const ReactAccordion = ({
  allowMultipleExpanded,
  allowZeroExpanded,
  preExpanded,
  accordionOnChange,
  items,
  accordionClasses,
  accordionItemClasses,
  accordionHeadingClasses,
  accordionButtonClasses,
  accordionPanelClasses
}) => {
  return (
    <Accordion
      allowMultipleExpanded={allowMultipleExpanded}
      allowZeroExpanded={allowZeroExpanded}
      preExpanded={preExpanded}
      onChange={accordionOnChange}
      className={cx(classes.accordion, accordionClasses)}
    >
      {items.map(item => (
        <AccordionItem
          key={item.uuid}
          uuid={item.uuid}
          className={cx(classes.accordion_item, accordionItemClasses)}
        >
          <AccordionItemHeading
            className={cx(
              classes.accordion_item__heading,
              accordionHeadingClasses
            )}
          >
            <AccordionItemButton
              className={cx(
                classes.accordion_item__button,
                accordionButtonClasses
              )}
            >
              {item.heading}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel
            className={cx(classes.accordion_item__panel, accordionPanelClasses)}
          >
            {item.content}
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
};
