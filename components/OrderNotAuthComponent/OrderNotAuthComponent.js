import React from 'react';
import MainLayout from '../UIComponents/MainLayout/MainLayout';
import Styles from './OrderNotAuthComponent.module.scss';

const OrderNotAuthComponent = () => (
  <MainLayout>
    <div className={Styles.OrderNotAuthComponent}>
      <div className={Styles.OrderNotAuthComponent__Wrapper}>
        <div className={Styles.OrderNotAuthComponent__Content}>
          <form className={Styles.OrderNotAuthComponent__Form}>
            <h2 className={Styles.OrderNotAuthComponent__FormTitle}>Войти в аккаунт</h2>
            <input className={`${Styles.OrderNotAuthComponent__FormField} ${Styles.OrderNotAuthComponent__FormFieldFirst}`} type="text" placeholder="E-mail" />
            <input className={Styles.OrderNotAuthComponent__FormField} type="text" placeholder="Пароль" />
            <div className={Styles.OrderNotAuthComponent__RememberBlock}>
              <input type="checkbox" className={Styles.OrderNotAuthComponent__Field} id="remember" />
              <label className={Styles.OrderNotAuthComponent__RememberText} htmlFor="remember"><span className={Styles.OrderNotAuthComponent__RememberTextBlock} /> Запомнить меня</label>
              <button className={Styles.OrderNotAuthComponent__ButtonRemember} type="button">Забыли пароль?</button>
            </div>
            <button className={Styles.OrderNotAuthComponent__Submit} type="button">Войти</button>
          </form>
          <div className={Styles.OrderNotAuthComponent__AddInfo}>
            <h2 className={Styles.OrderNotAuthComponent__AddInfoTitle}>Ещё нет аккаунта?</h2>
            <p className={Styles.OrderNotAuthComponent__AddInfoDesc}>
              Вы можете оформить заказ без регистрации.
              Или создать аккаунт после оформления заказа
            </p>
            <div className={Styles.OrderNotAuthComponent__AddInfoFields}>
              <input className={Styles.OrderNotAuthComponent__Field} type="radio" name="select" id="first" />
              <label htmlFor="first" className={Styles.OrderNotAuthComponent__AddInfoController}><span className={Styles.OrderNotAuthComponent__AddInfoControllerBlock} /> Оформить заказ без регистрации</label>
              <input className={Styles.OrderNotAuthComponent__Field} type="radio" name="select" id="second" />
              <label htmlFor="second" className={Styles.OrderNotAuthComponent__AddInfoController}><span className={Styles.OrderNotAuthComponent__AddInfoControllerBlock} /> Зарегистрироваться во время регистрации</label>
            </div>
            <button className={Styles.OrderNotAuthComponent__AddInfoButton} type="button">Продолжить оформление заказа</button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
);

export default OrderNotAuthComponent;
