import React from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../Layout/Button/Button';
import styles from './Questions.scss';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../Accordion/Accordion'),
  { ssr: false },
);

const DropDownItem = ({ answer }) => (
  <div className={styles.info}>
    <dv className={styles.infoDesc} dangerouslySetInnerHTML={{ __html: answer }} />
    <Link href="/about/pick-up-points">
      <Button
        buttonType="button"
        title="Показать магазины рядом"
        classNameWrapper={styles.button}
        viewType="black"
        href
      />
    </Link>
  </div>
);

const Questions = ({ questions, classNameWrapper }) => (
  <div className={classNameWrapper}>
    <h3>Вопросы и Ответы</h3>
    <ul className={styles.accordion} uk-accordion="multiple: true">
      {questions.map(item => (
        <DynamicComponentWithNoSSRAccordion
          key={item.id}
          classNameWrapper={styles.item}
          addClassNameWrapper={styles.itemOpen}
          title={item.question}
          toggled={false}
        >
          <DropDownItem answer={item.answer} />
        </DynamicComponentWithNoSSRAccordion>
      ))}
    </ul>
  </div>
);

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  classNameWrapper: PropTypes.string,
};

DropDownItem.propTypes = {
  answer: PropTypes.string,
};

export default Questions;
