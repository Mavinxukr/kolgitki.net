import React from 'react';
import Styles from './SalePayment.nodule.scss';

const SalePayment = () => (
  <>
    <input type="checkbox" id="openPayment" className={Styles.SalePayment__Field} />
    <div className={Styles.SalePayment}>
      <label htmlFor="openPayment" className={Styles.SalePayment__ControllerTitle}>Оплата</label>
      <div className={Styles.SalePayment__Content}>
        <div className={Styles.SalePayment__RadioButtons}>
          <input className={Styles.SalePayment__Field} type="radio" name="selectPayment" id="deliver" />
          <label htmlFor="deliver" className={Styles.SalePayment__Controller}><span className={Styles.SalePayment__ControllerBlock} /> Картой</label>
          <input className={Styles.SalePayment__Field} type="radio" name="selectPayment" id="privat" />
          <label htmlFor="privat" className={Styles.SalePayment__Controller}><span className={Styles.SalePayment__ControllerBlock} /> При получении</label>
        </div>
        <div className={Styles.SalePayment__Discont}>
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
