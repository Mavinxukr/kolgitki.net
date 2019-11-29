import React from 'react';
import Styles from './ProfileDataEdit.module.scss';

const ProfileDataEdit = () => (
  <div className={Styles.ProfileDataEdit}>
    <h2 className={Styles.ProfileDataEdit__Title}>Мои данные</h2>
    <form className={Styles.ProfileDataEdit__Form}>
      <div className={Styles.ProfileDataEdit__FormItem}>
        <label className={Styles.ProfileDataEdit__FormLabel} htmlFor="name">ФИО</label>
        <input className={Styles.ProfileDataEdit__FormField} id="name" type="text" defaultValue="Тунчинко Игорь Николаевич" />
      </div>
      <div className={Styles.ProfileDataEdit__FormItem}>
        <label className={Styles.ProfileDataEdit__FormLabel} htmlFor="number">Номер телефона</label>
        <input className={Styles.ProfileDataEdit__FormField} id="number" type="text" defaultValue="+380 (097) 790 90 21" />
      </div>
      <div className={Styles.ProfileDataEdit__FormItem}>
        <label className={Styles.ProfileDataEdit__FormLabel} htmlFor="email">Почта</label>
        <input className={Styles.ProfileDataEdit__FormField} id="email" type="email" defaultValue="ihor@gmail.com" />
      </div>
      <div className={Styles.ProfileDataEdit__FormItem}>
        <label className={Styles.ProfileDataEdit__FormLabel} htmlFor="date">Дата рождения</label>
        <input className={Styles.ProfileDataEdit__FormField} id="date" type="text" defaultValue="14.05.1990" />
      </div>
      <hr className={Styles.ProfileDataEdit__Line} />
      <div className={Styles.ProfileDataEdit__FormGroup}>
        <p className={Styles.ProfileDataEdit__FormGroupTitle}>Адрес доставки</p>
        <div className={Styles.ProfileDataEdit__FormGroupChild}>
          <input className={Styles.ProfileDataEdit__FormGroupField} id="area" type="checkbox" />
          <label className={Styles.ProfileDataEdit__FormGroupSelect} htmlFor="area">Киевская область</label>
          <input className={Styles.ProfileDataEdit__FormGroupField} id="city" type="checkbox" />
          <label className={Styles.ProfileDataEdit__FormGroupSelect} htmlFor="city">Киев</label>
          <input className={Styles.ProfileDataEdit__FormGroupField} id="post" type="checkbox" />
          <label className={`${Styles.ProfileDataEdit__FormGroupSelect} ${Styles.ProfileDataEdit__FormGroupSelectGrey}`} htmlFor="post">Отделение НП</label>
          <input className={Styles.ProfileDataEdit__FormField} type="text" placeholder="Адрес для курьера" />
          <button className={Styles.ProfileDataEdit__FormGroupButton} type="submit">Сохранить</button>
        </div>
      </div>
      <hr className={`${Styles.ProfileDataEdit__Line} ${Styles.ProfileDataEdit__SecondLine}`} />
    </form>
    <form className={Styles.ProfileDataEdit__FormPasssword}>
      <h2 className={Styles.ProfileDataEdit__FormPasswordTitle}>Пароль</h2>
      <div className={Styles.ProfileDataEdit__FormPasswordGroup}>
        <input className={Styles.ProfileDataEdit__FormField} type="password" placeholder="Старый пароль" />
        <input className={Styles.ProfileDataEdit__FormField} type="password" placeholder="Новый пароль" />
        <input className={Styles.ProfileDataEdit__FormField} type="password" placeholder="Повторите новый пароль" />
        <button className={Styles.ProfileDataEdit__FormPasswordButton} type="submit">Обновить пароль</button>
      </div>
    </form>
  </div>
);

export default ProfileDataEdit;
