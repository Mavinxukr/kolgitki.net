import React from 'react';
import SaleItemHeader from '../SaleItemHeader/SaleItemHeader';
import Styles from './SaleInfo.module.scss';

const SaleInfo = () => (
  <>
    <input type="checkbox" id="infoOpen" className={Styles.SaleInfo__Field} />
    <div className={Styles.SaleInfo}>
      <SaleItemHeader colorStep="#0070c9" count="2" title="Информация" id="infoOpen" />
      <div className={Styles.SaleInfo__Content}>
        <form className={Styles.SaleInfo__Form}>
          <div className={Styles.SaleInfo__FormFirstGroup}>
            <input type="text" className={Styles.SaleInfo__FormField} placeholder="Имя" />
            <input type="text" className={Styles.SaleInfo__FormField} placeholder="Фамилия" />
          </div>
          <div className={Styles.SaleInfo__FormSecondGroup}>
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
