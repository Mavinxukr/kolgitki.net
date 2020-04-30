import React from 'react';
import styles from './QuestionsWrapper.scss';
import Questions from '../../../Questions/Questions';

const QuestionsWrapper = ({ questions }) => (
  <Questions questions={questions} classNameWrapper={styles.questionsWrapper} />
);

export default QuestionsWrapper;
