import React from 'react';
import SaleItemHeader from '../SaleItemHeader/SaleItemHeader';
import Styles from './SaleMethodOrder.module.scss';

const SaleMethodOrder = () => (
  <>
    <input type="checkbox" className={Styles.SaleMethodOrder__Field} id="openMethod" />
    <div className={Styles.SaleMethodOrder}>
      <SaleItemHeader title="Метод оформления" colorStep="#78c38b" id="openMethod" count="1" />
      <div className={Styles.SaleMethodOrder__Content}>
        <form className={Styles.SaleMethodOrder__Form}>
          <h2 className={Styles.SaleMethodOrder__FormTitle}>Войти в аккаунт</h2>
          <input className={`${Styles.SaleMethodOrder__FormField} ${Styles.SaleMethodOrder__FormFieldFirst}`} type="text" placeholder="E-mail" />
          <input className={Styles.SaleMethodOrder__FormField} type="text" placeholder="Пароль" />
          <div className={Styles.SaleMethodOrder__RememberBlock}>
            <input type="checkbox" className={Styles.SaleMethodOrder__Field} id="remember" />
            <label className={Styles.SaleMethodOrder__RememberText} htmlFor="remember"><span className={Styles.SaleMethodOrder__RememberTextBlock} /> Запомнить меня</label>
            <button className={Styles.SaleMethodOrder__ButtonRemember} type="button">Забыли пароль?</button>
          </div>
          <button className={Styles.SaleMethodOrder__Submit} type="button">Войти</button>
        </form>
        <div className={Styles.SaleMethodOrder__AddInfo}>
          <h2 className={Styles.SaleMethodOrder__AddInfoTitle}>Ещё нет аккаунта?</h2>
          <p className={Styles.SaleMethodOrder__AddInfoDesc}>
            Вы можете оформить заказ без регистрации.
            Или создать аккаунт после оформления заказа
          </p>
          <div className={Styles.SaleMethodOrder__AddInfoFields}>
            <input className={Styles.SaleMethodOrder__Field} type="radio" name="select" id="first" />
            <label htmlFor="first" className={Styles.SaleMethodOrder__AddInfoController}><span className={Styles.SaleMethodOrder__AddInfoControllerBlock} /> Оформить заказ без регистрации</label>
            <input className={Styles.SaleMethodOrder__Field} type="radio" name="select" id="second" />
            <label htmlFor="second" className={Styles.SaleMethodOrder__AddInfoController}><span className={Styles.SaleMethodOrder__AddInfoControllerBlock} /> Зарегистрироваться во время регистрации</label>
          </div>
          <button className={Styles.SaleMethodOrder__AddInfoButton} type="button">Продолжить оформление заказа</button>
        </div>
      </div>
    </div>
  </>
);

export default SaleMethodOrder;
