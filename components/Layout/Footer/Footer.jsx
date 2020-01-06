import React from 'react';
import Link from 'next/link';
import IconInstagram from '../../../assets/svg/instagram.svg';
import IconFacebook from '../../../assets/svg/Path 109.svg';
import IconTwitter from '../../../assets/svg/Path 162.svg';
import styles from './Footer.scss';

const Footer = () => (
  <footer className={styles.footer}>
    <hr className={styles.line} />
    <div className={styles.container}>
      <div className={styles.itemOne}>
        <nav>
          <h6 className={styles.menuTitle}>Покупателям</h6>
          <ul className={styles.menuItems}>
            <li>
              <a className={styles.menuText} href="/">
                Преимущества
              </a>
            </li>
            <li>
              <a className={styles.menuText} href="/">
                Доставка/Оплата
              </a>
            </li>
            <li>
              <a className={styles.menuText} href="/">
                Возрат/Обмен
              </a>
            </li>
            <li>
              <a className={styles.menuText} href="/">
                Вопросы и Ответы
              </a>
            </li>
          </ul>
        </nav>
        <nav className={styles.childNav}>
          <h6 className={`${styles.menuTitle} ${styles.menuTitleLastTitle}`}>
            Оптовым покупателям
          </h6>
          <ul className={styles.menuItems}>
            <li>
              <Link href="/opt">
                <a className={styles.menuText}>Общая информация</a>
              </Link>
            </li>
            <li>
              <Link
                href={{
                  pathname: '/profile-wholesale',
                  query: { id: 'docsLoad' },
                }}
              >
                <a className={styles.menuText}>Скачать .pdf</a>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <nav className={styles.itemTwo}>
        <h6 className={styles.menuTitle}>О нас</h6>
        <ul className={styles.menuItems}>
          <li>
            <a className={styles.menuText} href="/">
              Контакты
            </a>
          </li>
          <li>
            <a className={styles.menuText} href="/">
              О магазине
            </a>
          </li>
          <li>
            <a className={styles.menuText} href="/">
              Вакансии
            </a>
          </li>
          <li>
            <a href="/" className={styles.menuText}>
              Новости
            </a>
          </li>
        </ul>
      </nav>
      <nav className={styles.itemThree}>
        <h6 className={styles.menuTitle}>Категории</h6>
        <ul className={styles.menuItems}>
          <li>
            <a className={styles.menuText} href="/">
              Колготки
            </a>
          </li>
          <li>
            <a className={styles.menuText} href="/">
              Чулки
            </a>
          </li>
          <li>
            <a className={styles.menuText} href="/">
              Нижнее белье
            </a>
          </li>
          <li>
            <a className={styles.menuText} href="/">
              Одежда
            </a>
          </li>
          <li>
            <a className={styles.menuText} href="/">
              Носки
            </a>
          </li>
          <li>
            <a className={styles.menuText} href="/">
              Для детей
            </a>
          </li>
        </ul>
        <a href="/" className={styles.menuLink}>
          Смотреть все
        </a>
      </nav>
      <form className={styles.form}>
        <h4>
          Хотите получать чаще акционные <br />
          предложения?
        </h4>
        <input
          className={styles.field}
          placeholder="Ваш E-mail"
          type="email"
          required="required"
        />
        <div className={styles.buttonWrapper}>
          <button type="submit" className={styles.formButton}>
            Подписаться
          </button>
        </div>
        <div className={styles.formIcons}>
          <a className={styles.formIcon} href="/">
            <IconFacebook />
          </a>
          <a className={styles.formIcon} href="/">
            <IconInstagram />
          </a>
          <a className={styles.formIcon} href="/">
            <IconTwitter />
          </a>
        </div>
        <a href="/" className={styles.formLink}>
          Пользовательское соглашение
        </a>
      </form>
    </div>
  </footer>
);

export default Footer;
