import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import QuestionsWrapper from '../../components/Wrappers/Info/QuestionsWrapper/QuestionsWrapper';
import { getFAQ } from '../../services/Info/questions';

const Questions = ({ questions }) => (
  <NavPanel
    routerValues={[{
      id: 1,
      name: 'Главная',
      pathname: '/',
    },
    {
      id: 2,
      name: 'Вопросы и ответы',
    }]}
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
