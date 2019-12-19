import React from 'react';
import styles from './ProfileDataEdit.scss';

const FormItem = ({
  id, defaultValue, title, type,
}) => (
  <div className={styles.formItem}>
    <label className={styles.formLabel} htmlFor={id}>
      {title}
    </label>
    <input
      className={styles.formField}
      id={id}
      type={type}
      defaultValue={defaultValue}
    />
  </div>
);

const ProfileDataEdit = () => (
  <div className={styles.profileDataEdit}>
    <h2 className={styles.title}>Мои данные</h2>
    <form className={styles.form}>
      <FormItem
        id="name"
        defaultValue="Тунчинко Игорь Николаевич"
        type="text"
        title="ФИО"
      />
      <FormItem
        id="number"
        defaultValue="+380 (097) 790 90 21"
        type="text"
        title="Номер телефона"
      />
      <FormItem
        id="email"
        defaultValue="ihor@gmail.com"
        type="email"
        title="Почта"
      />
      <FormItem
        id="date"
        defaultValue="Тунчинко Игорь Николаевич"
        type="date"
        title="Дата рождения"
      />
      <hr className={styles.line} />
      <div className={styles.formGroup}>
        <p className={styles.formGroupTitle}>Адрес доставки</p>
        <div className={styles.formGroupChild}>
          <input className={styles.formGroupField} id="area" type="checkbox" />
          <label className={styles.formGroupSelect} htmlFor="area">
            Киевская область
          </label>
          <input className={styles.formGroupField} id="city" type="checkbox" />
          <label className={styles.formGroupSelect} htmlFor="city">
            Киев
          </label>
          <input className={styles.formGroupField} id="post" type="checkbox" />
          <label
            className={`${styles.formGroupSelect} ${styles.formGroupSelectGrey}`}
            htmlFor="post"
          >
            Отделение НП
          </label>
          <input
            className={styles.formField}
            type="text"
            placeholder="Адрес для курьера"
          />
          <button className={styles.formGroupButton} type="submit">
            Сохранить
          </button>
        </div>
      </div>
      <hr className={`${styles.line} ${styles.secondLine}`} />
    </form>
    <form className={styles.formPasssword}>
      <h2 className={styles.formPasswordTitle}>Пароль</h2>
      <div className={styles.formPasswordGroup}>
        <input
          autoComplete="current-password"
          className={styles.formField}
          type="password"
          placeholder="Старый пароль"
        />
        <input
          autoComplete="new-password"
          className={styles.formField}
          type="password"
          placeholder="Новый пароль"
        />
        <input
          autoComplete="new-password"
          className={styles.formField}
          type="password"
          placeholder="Повторите новый пароль"
        />
        <button className={styles.formPasswordButton} type="submit">
          Обновить пароль
        </button>
      </div>
    </form>
  </div>
);

export default ProfileDataEdit;
