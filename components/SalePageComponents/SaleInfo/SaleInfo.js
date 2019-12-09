import React from 'react';
import Styles from './SaleInfo.module.scss';

const SaleInfo = () => (
  <>
    <input type="checkbox" id="infoOpen" className={Styles.SaleInfo__Field} />
    <div className={Styles.SaleInfo}>
      <label htmlFor="infoOpen" className={Styles.SaleInfo__ControllerTitle}>Информация</label>
      <div className={Styles.SaleInfo__Content}>
        <form className={Styles.SaleInfo__Form}>
          <div className={Styles.SaleInfo__FormGroup}>
            <input type="text" className={Styles.SaleInfo__FormField} placeholder="Фамилия" />
            <input type="text" className={Styles.SaleInfo__FormField} placeholder="Имя" />
            <input type="text" className={Styles.SaleInfo__FormField} placeholder="Отчество" />
            <input type="text" className={Styles.SaleInfo__FormField} placeholder="E-mail" />
            <input type="text" className={Styles.SaleInfo__FormField} placeholder="+38 (____) ___ __ __" />
          </div>
          <input type="checkbox" className={Styles.SaleInfo__Field} id="createAccount" />
          <label className={Styles.SaleInfo__CreateText} htmlFor="createAccount"><span className={Styles.SaleInfo__CreateTextBlock} /> Создать аккаунт</label>
        </form>
      </div>
    </div>
  </>
);

export default SaleInfo;
