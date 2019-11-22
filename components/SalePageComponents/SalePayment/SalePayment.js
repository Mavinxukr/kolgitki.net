import React from 'react';
import SaleItemHeader from '../SaleItemHeader/SaleItemHeader';
import Styles from './SalePayment.nodule.scss';

const SalePayment = () => (
  <>
    <input type="checkbox" id="openPayment" className={Styles.SalePayment__Field} />
    <div className={Styles.SalePayment}>
      <SaleItemHeader colorStep="#0070c9" title="Оплата" id="openPayment" count="4" />
      <div className={Styles.SalePayment__Content}>
        <div className={Styles.SalePayment__RadioButtons}>
          <input className={Styles.SalePayment__Field} type="radio" name="selectPayment" id="deliver" />
          <label htmlFor="deliver" className={Styles.SalePayment__Controller}><span className={Styles.SalePayment__ControllerBlock} /> При получении</label>
          <input className={Styles.SalePayment__Field} type="radio" name="selectPayment" id="privat" />
          <label htmlFor="privat" className={Styles.SalePayment__Controller}><span className={Styles.SalePayment__ControllerBlock} /> Система &#8221;Приват 24&#8221;</label>
          <input className={Styles.SalePayment__Field} type="radio" name="selectPayment" id="visa" />
          <label htmlFor="visa" className={Styles.SalePayment__Controller}><span className={Styles.SalePayment__ControllerBlock} /> Оплата VISA, MasterCard (любой банк)</label>
          <input className={Styles.SalePayment__Field} type="radio" name="selectPayment" id="bank" />
          <label htmlFor="bank" className={Styles.SalePayment__Controller}><span className={Styles.SalePayment__ControllerBlock} /> В отделении банка на расчетный счет</label>
          <input className={Styles.SalePayment__Field} type="radio" name="selectPayment" id="terminal" />
          <label htmlFor="terminal" className={Styles.SalePayment__Controller}><span className={Styles.SalePayment__ControllerBlock} /> Через банковский терминал</label>
        </div>
        <div className={Styles.SalePayment__Discont}>
          <h2 className={Styles.SalePayment__DiscontTitle}>Сделать покупку дешевле</h2>
          <div className={Styles.SalePayment__DiscontItem}>
            <h2 className={Styles.SalePayment__DiscontTitle}>Бонусов: <span className={Styles.SalePayment__DiscontCount}>14,57</span></h2>
            <input className={Styles.SalePayment__DiscontField} placeholder="00, 00" type="text" />
            <button className={Styles.SalePayment__DiscontButton} type="button">Применить</button>
          </div>
          <div className={Styles.SalePayment__DiscontItem}>
            <h2 className={Styles.SalePayment__DiscontTitle}>Промокод</h2>
            <input className={`${Styles.SalePayment__DiscontField} ${Styles.SalePayment__DiscontFieldCode}`} placeholder="XXX-XXX-XXX" type="text" />
            <button className={Styles.SalePayment__DiscontButton} type="button">Применить</button>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SalePayment;
