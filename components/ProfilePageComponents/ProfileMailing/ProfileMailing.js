import React from 'react';
import Styles from './ProfileMailing.module.scss';

const ProfileMailing = () => (
  <div className={Styles.ProfileMailing}>
    <h2 className={Styles.ProfileMailing__Title}>Рассылки</h2>
    <p className={Styles.ProfileMailing__Desc}>Виды рассылок</p>
    <input defaultChecked type="checkbox" id="news" className={Styles.ProfileMailing__Field} />
    <label className={Styles.ProfileMailing__Controller} htmlFor="news">Новости, акции компании</label>
    <p className={Styles.ProfileMailing__Text}>Новые товары в магазине и акции на просмотренные вами товары</p>
    <hr className={Styles.ProfileMailing__Line} />
    <input defaultChecked type="checkbox" id="discount" className={Styles.ProfileMailing__Field} />
    <label className={Styles.ProfileMailing__Controller} htmlFor="discount">Промокоды, скидки и акции</label>
    <p className={Styles.ProfileMailing__TextTwo}>
      Информация о скидках, промокодах и акциях <br />
      Периодически мы проводим акции со скидками, розыгрышами, промокодами,
      которые могут помочь сэконмить на покупки или получить
      несколько товаров по цене одного.
    </p>
    <p className={Styles.ProfileMailing__Select}>Отправляем вам на</p>
    <input defaultChecked className={Styles.ProfileMailing__Field} type="checkbox" id="email" />
    <label className={`${Styles.ProfileMailing__Controller} ${Styles.ProfileMailing__ControllerSelect}`} htmlFor="email">E-mail</label>
    <input defaultChecked className={Styles.ProfileMailing__Field} type="checkbox" id="viber" />
    <label className={`${Styles.ProfileMailing__Controller} ${Styles.ProfileMailing__ControllerSelect}`} htmlFor="viber">Viber</label>
    <input defaultChecked className={Styles.ProfileMailing__Field} type="checkbox" id="sms" />
    <label className={`${Styles.ProfileMailing__Controller} ${Styles.ProfileMailing__ControllerSelect}`} htmlFor="sms">SMS</label>
    <input defaultChecked className={Styles.ProfileMailing__Field} type="checkbox" id="notice" />
    <label className={`${Styles.ProfileMailing__Controller} ${Styles.ProfileMailing__ControllerSelect}`} htmlFor="notice">Уведомления в браузере</label>
    <button className={Styles.ProfileMailing__Button} type="button">Сохранить</button>
  </div>
);

export default ProfileMailing;
