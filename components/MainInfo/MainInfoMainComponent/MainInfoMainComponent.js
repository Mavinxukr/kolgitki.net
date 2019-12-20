import React, { useState } from 'react';
import Global from '../../Layout/Global/Global';
import MainInfoBreadCrumbs from '../MainInfoBreadCrumbs/MainInfoBreadCrumbs';
import MainInfoAdvantages from '../MainInfoAdvantages/MainInfoAdvantages';
import Questions from '../Questions/Questions';
import TermsOfUse from '../TermsOfUse/TermsOfUse';
import Styles from './MainInfoMainComponent.module.scss';
import './MainInfoMainComponent.scss';

const arrIdName = [
  {
    id: 1,
    name: 'advantages',
    label: 'Наши преимущества',
  },
  {
    id: 2,
    name: 'delivery',
    label: 'Доставка и Оплата',
  },
  {
    id: 3,
    name: 'return',
    label: 'Возврат / Обмен',
  },
  {
    id: 4,
    name: 'questions',
    label: 'Вопрос и Ответы',
  },
  {
    id: 5,
    name: 'agreement',
    label: 'Пользовательское соглашения',
  },
];

const MainInfoMainComponent = () => {
  const [valueForCrumb, setValueForCrumb] = useState('Наши преимущества');

  const onSetCrumb = e => setValueForCrumb(e.target.textContent);

  return (
    <Global>
      <div className={Styles.MainInfoMainComponent__Content}>
        <MainInfoBreadCrumbs valueForCrumb={valueForCrumb} />
        <div className={Styles.MainInfoMainComponent__NavPanel}>
          {
            arrIdName.map(item => <input defaultChecked={false} key={item.id} type="radio" className={Styles.MainInfoMainComponent__Field} name="switcher" id={item.name} />)
          }
          <nav className={Styles.MainInfoMainComponent__Nav}>
            {
              arrIdName.map(item => <label key={item.id} onClick={onSetCrumb} className={Styles.MainInfoMainComponent__Switcher} htmlFor={item.name}>{item.label}</label>)
            }
          </nav>
          <div id="advantages" className={Styles.MainInfoMainComponent__Item}>
            <MainInfoAdvantages />
          </div>
          <div id="delivery" className={Styles.MainInfoMainComponent__Item}>
            <Questions />
          </div>
          <div id="return" className={Styles.MainInfoMainComponent__Item}>
            3
          </div>
          <div id="questions" className={Styles.MainInfoMainComponent__Item}>
            4
          </div>
          <div id="agreement" className={Styles.MainInfoMainComponent__Item}>
            <TermsOfUse />
          </div>
        </div>
      </div>
    </Global>
  );
};

export default MainInfoMainComponent;
