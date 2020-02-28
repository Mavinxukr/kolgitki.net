import React from 'react';
import dynamic from 'next/dynamic';
import Button from '../../../Layout/Button/Button';
import styles from './Questions.scss';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false },
);

const DropDownItem = () => (
  <div className={styles.info}>
    <p className={styles.infoDesc}>
      Лучше в магазине забирайте. У нас их много. На протяжении веков украинский народ развивал
      собственное музыкально искусство, театр и живопись. Некоторые украинские художники и их шедев
      известны не только в Украине, но и во всем мире.
    </p>
    <Button
      buttonType="button"
      title="Показать магазины рядом"
      classNameWrapper={styles.button}
      viewType="black"
    />
  </div>
);

const Questions = () => (
  <div className={styles.questions}>
    <h3>Вопросы и Ответы</h3>
    <ul className={styles.accordion} uk-accordion="multiple: true">
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Сколько стоит доставка"
        toggled={false}
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Характеристики"
        toggled={false}
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Какую доставку выбрать"
        toggled
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
    </ul>
  </div>
);

export default Questions;
