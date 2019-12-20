import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import Global from '../../Layout/Global/Global';
import AboutPageBreadCrumbs from '../AboutPageBreadCrumbs/AboutPageBreadCrumbs';
import Careers from '../Careers/Careers';
import SiteMap from '../SiteMap/SiteMap';
import Contacts from '../Contacts/Contacts';
import PIckUpPoints from '../PIckUpPoints/PIckUpPoints';
import Styles from './AboutPageMainComponent.module.scss';
import './AboutPageMainComponent.scss';

const DynamicComponentWithNoSSRSlider = dynamic(
  () => import('../AboutStore/AboutStore'),
  { ssr: false },
);

const arrIdName = [
  {
    id: 1,
    name: 'about',
    label: 'О магазине',
  },
  {
    id: 2,
    name: 'contact',
    label: 'Контакты',
  },
  {
    id: 3,
    name: 'dots',
    label: 'Точки самовывоза',
  },
  {
    id: 4,
    name: 'jobOpening',
    label: 'Вакансии',
  },
  {
    id: 5,
    name: 'maps',
    label: 'Карта сайта',
  },
];

const AboutPageMainComponent = () => {
  const [valueForCrumb, setValueForCrumb] = useState('О магазине');

  const onSetCrumb = e => setValueForCrumb(e.target.textContent);

  return (
    <Global>
      <div className={Styles.AboutPageMainComponent__Content}>
        <AboutPageBreadCrumbs valueForCrumb={valueForCrumb} />
        <div className={Styles.AboutPageMainComponent__NavPanel}>
          {
            arrIdName.map(item => <input defaultChecked={false} key={item.id} type="radio" className={Styles.AboutPageMainComponent__Field} name="switcher" id={item.name} />)
          }
          <nav className={Styles.AboutPageMainComponent__Nav}>
            {
              arrIdName.map(item => <label key={item.id} onClick={onSetCrumb} className={Styles.AboutPageMainComponent__Switcher} htmlFor={item.name}>{item.label}</label>)
            }
          </nav>
          <div id="about" className={Styles.AboutPageMainComponent__Item}>
            <DynamicComponentWithNoSSRSlider />
          </div>
          <div id="contact" className={Styles.AboutPageMainComponent__Item}>
            <Contacts />
          </div>
          <div id="dots" className={Styles.AboutPageMainComponent__Item}>
            <PIckUpPoints />
          </div>
          <div id="jobOpening" className={Styles.AboutPageMainComponent__Item}>
            <Careers />
          </div>
          <div id="maps" className={Styles.AboutPageMainComponent__Item}>
            <SiteMap />
          </div>
        </div>
      </div>
    </Global>
  );
};

export default AboutPageMainComponent;
