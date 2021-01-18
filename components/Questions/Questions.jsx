import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../Layout/Button/Button';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './Questions.scss';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../Accordion/Accordion'),
  { ssr: false },
);

const DropDownItem = ({ answer, answerUa }) => (
  <div className={styles.info}>
    <div className={styles.infoDesc}
      dangerouslySetInnerHTML={{ __html: parseText(cookies, answer, answerUa) }}
    />
    <Link href="/about/pick-up-points" prefetch={false}>
      <Button
        buttonType="button"
        title="Показать магазины рядом"
        titleUa="Показати магазини поруч"
        classNameWrapper={styles.button}
        viewType="black"
        href
      />
    </Link>
  </div>
);

const Questions = ({ questions, classNameWrapper }) => {
  const [indexActive, setIndexActive] = useState(0);

  const onSetIndexAccordion = (id) => {
    if (indexActive === id) {
      setIndexActive(0);
    } else {
      setIndexActive(id);
    }
  };

  return (
    <div className={classNameWrapper}>
      <h3 className={styles.title}>
        {parseText(cookies, 'Вопросы и Ответы', 'Питання та відповіді')}
      </h3>
      <ul className={styles.accordion} uk-accordion="multiple: true">
        {questions.map(item => (
          <DynamicComponentWithNoSSRAccordion
            key={item.id}
            classNameWrapper={styles.item}
            addClassNameWrapper={styles.itemOpen}
            title={item.question}
            titleUk={item.question_ua}
            toggled={false}
            setIndexActive={() => onSetIndexAccordion(item.id)}
            isCurrentAccordionActive={indexActive === item.id}
          >
            <DropDownItem answer={item.answer} answerUa={item.answer_ua} />
          </DynamicComponentWithNoSSRAccordion>
        ))}
      </ul>
    </div>
  );
};

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  classNameWrapper: PropTypes.string,
};

DropDownItem.propTypes = {
  answer: PropTypes.string,
  answerUa: PropTypes.string,
};

export default Questions;
