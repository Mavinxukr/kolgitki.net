import React from 'react';
import styles from './Contacts.scss';

const Input = ({ type, placeholder, width }) => (
  <input
    type={type}
    placeholder={placeholder}
    style={{ width }}
    className={styles.formField}
  />
);

const Contacts = () => (
  <div className={styles.contacts}>
    <h2 className={styles.title}>Контакты</h2>
    <p className={styles.descContact}>Обратная связь</p>
    <div className={styles.contactInfo}>
      <div className={styles.contactInfoItem}>
        <p className={styles.email}>hello@kolgot.net</p>
        <ul className={styles.numbers}>
          <li className={styles.number}>0 (800) 645 323 55</li>
          <li className={styles.number}>0 (800) 865 456 23</li>
          <li className={styles.number}>0 (800) 632 334 15</li>
        </ul>
      </div>
      <div className={styles.contactInfoItem}>
        <h2 className={styles.timeTitle}>Время работы</h2>
        <ul className={styles.timeSections}>
          <li className={styles.timeSection}>Пн. - Пт. 10:00 — 21:00</li>
          <li className={styles.timeSection}>Сб. 12:00 — 20:00</li>
          <li className={styles.timeSection}>Вс. Выходной</li>
        </ul>
      </div>
    </div>
    <div className={styles.links}>
      <a className={styles.link} href="/">
        Telegram
      </a>
      <a className={styles.link} href="/">
        Viber
      </a>
    </div>
    <p className={styles.desc}>
      Поддерживать высокие ожидания для студентов с ограниченными возможностями.
      Опрошенные признали, что не каждый учащийся.
    </p>
    <form className={styles.form}>
      <div className={styles.inputsGroup}>
        <Input type="text" width="225px" placeholder="Имя" />
        <Input
          type="text"
          width="225px"
          placeholder="* + 380 ( ___ ) ___ - __ - __"
        />
      </div>
      <Input type="text" width="98.3%" placeholder="* E-mail" />
      <textarea
        className={styles.textField}
        rows="2"
        placeholder="Комментарий"
      />
      <button className={styles.formButton} type="submit">
        Отправить
      </button>
    </form>
  </div>
);

export default Contacts;
