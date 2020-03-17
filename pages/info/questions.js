import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import QuestionsWrapper from '../../components/Wrappers/Info/Questions/Questions';
import { getFAQ } from '../../services/Info/questions';

const Questions = ({ questions }) => (
  <NavPanel
    routerValues={['Главная', 'Вопросы и ответы']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <QuestionsWrapper questions={questions} />
  </NavPanel>
);

Questions.getInitialProps = async () => {
  const questions = await getFAQ({});

  return {
    questions: questions.data,
  };
};

export default Questions;
