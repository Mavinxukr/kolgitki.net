import React from 'react';
import { Accordion } from 'react-accessible-accordion';
import './ReactAccordion.css';
import cx from 'classnames';
import classes from './ReactAccordion.scss';
import { ReactAccordionItem } from './ReactAccordionItem/ReactAccordionItem';
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
  accordionItemClassesActive,
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
        <ReactAccordionItem
          key={item.uuid}
          uuid={item.uuid}
          heading={item.heading}
          content={item.content}
          accordionItemClasses={accordionItemClasses}
          accordionItemClassesActive={accordionItemClassesActive}
          accordionHeadingClasses={accordionHeadingClasses}
          accordionButtonClasses={accordionButtonClasses}
          accordionPanelClasses={accordionPanelClasses}
        />
      ))}
    </Accordion>
  );
};
