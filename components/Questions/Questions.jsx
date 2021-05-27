import React, { useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import Button from '../Layout/Button/Button';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './Questions.scss';
import { ReactAccordion } from '../ReactAccordion/ReactAccordion';

const DropDownItem = ({ answer, answerUa }) => (
  <div className={styles.info}>
    <div
      className={styles.infoDesc}
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

  const onSetIndexAccordion = id => {
    if (indexActive === id) {
      setIndexActive(0);
    } else {
      setIndexActive(id);
    }
  };

  const accordionContent = questions.map(item => {
    return {
      uuid: item.id.toString(),
      heading: (
        <div className={styles.headerWrapper}>
          {parseText(cookies, item.question, item.question_ua)}
        </div>
      ),
      content: <DropDownItem answer={item.answer} answerUa={item.answer_ua} />
    };
  });

  return (
    <div className={classNameWrapper}>
      <h3 className={styles.title}>
        {parseText(cookies, 'Вопросы и Ответы', 'Питання та відповіді')}
      </h3>
      <ReactAccordion
        allowZeroExpanded={true}
        accordionClasses={styles.accordion}
        accordionItemClasses={styles.accordion_item}
        accordionHeadingClasses={styles.accordion_header}
        accordionButtonClasses={styles.accordion_button}
        accordionPanelClasses={styles.accordion_panel}
        items={accordionContent}
      />
    </div>
  );
};

Questions.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.object),
  classNameWrapper: PropTypes.string
};

DropDownItem.propTypes = {
  answer: PropTypes.string,
  answerUa: PropTypes.string
};

export default Questions;
