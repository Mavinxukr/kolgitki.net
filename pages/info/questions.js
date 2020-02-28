import React from 'react';
import { arrOfNavItems } from '../../utils/fakeFetch/dataForNavInfo';
import NavPanel from '../../components/Layout/NavPanel/NavPanel';
import QuestionsWrapper from '../../components/Wrappers/Info/Questions/Questions';

const Questions = () => (
  <NavPanel
    routerValues={['Главная', 'Вопросы и ответы']}
    mainRoute="info"
    arrOfNavItems={arrOfNavItems}
  >
    <QuestionsWrapper />
  </NavPanel>
);

export default Questions;
