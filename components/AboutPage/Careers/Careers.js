import React from 'react';
import Styles from './Careers.module.scss';

const DropDownItem = ({ title, id, idFileLoad }) => (
  <>
    <input className={Styles.Careers__Field} type="radio" name='carrersSwitcher' id={id} />
    <div className={Styles.Careers__Item}>
      <div className={Styles.Careers__ControllerWrapper}>
        <label className={Styles.Careers__Controller} htmlFor={id}>{title}</label>
      </div>
      <div className={Styles.Careers__Info}>
        <h2 className={Styles.Careers__InfoTitle}>Кого мы ищем?</h2>
        <p className={Styles.Careers__InfoDesc}>
            На протяжении веков украинский народ развивал собственное музыкально искусство,
            театр и живопись. Некоторые украинские художники и их шедев известны не только в
            Украине, но и во всем мире.
        </p>
        <ul className={Styles.Careers__FeaturesList}>
          <li className={Styles.Careers__FeaturesItem}>Высокую заработную плату</li>
          <li className={Styles.Careers__FeaturesItem}>Систему KPI и Материального</li>
          <li className={Styles.Careers__FeaturesItem}>Высокую заработную плату</li>
          <li className={Styles.Careers__FeaturesItem}>Систему KPI и Материального</li>
        </ul>
        <h2 className={Styles.Careers__InfoTitle}>Что мы предлагаем?</h2>
        <p className={Styles.Careers__InfoDesc}>
            На протяжении веков украинский народ развивал собственное музыкально искусство,
            театр и живопись. Некоторые украинские художники и их шедев известны не только в
            Украине, но и во всем мире.
        </p>
        <ul className={Styles.Careers__FeaturesList}>
          <li className={Styles.Careers__FeaturesItem}>Высокую заработную плату</li>
          <li className={Styles.Careers__FeaturesItem}>Систему KPI и Материального</li>
        </ul>
        <form className={Styles.Careers__Form}>
          <h2 className={Styles.Careers__FormTitle}>Подать заявку</h2>
          <div className={Styles.Careers__InputWrapper}>
            <input className={Styles.Careers__Field} type="file" id={idFileLoad} />
            <label className={Styles.Careers__LoadController} htmlFor={idFileLoad}>Загрузить резюме</label>
            <div className={Styles.Careers__InputGroup}>
              <input className={Styles.Careers__TextField} type="text" placeholder="Имя" />
              <input className={Styles.Careers__TextField} type="text" placeholder="+ 380 ( ___ ) ___ - __ - __" />
            </div>
          </div>
          <button className={Styles.Careers__FormButton} type="submit">Отправить</button>
        </form>
      </div>
    </div>
  </>
);

const Careers = () => (
  <div className={Styles.Careers}>
    <h2 className={Styles.Careers__Title}>Вакансии</h2>
    <DropDownItem title="Продавец в магазин" id="seller" />
    <DropDownItem title="Оператор колцентра" id="call" />
    <DropDownItem title="Аккаунт менеджер" id="manager" />
    <DropDownItem title="Графический дизайнер" id="design" />
  </div>
);

export default Careers;
