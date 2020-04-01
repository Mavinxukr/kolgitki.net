import React from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconInstagram from '../../../public/svg/instagram.svg';
import IconFacebook from '../../../public/svg/Path109.svg';
import IconTwitter from '../../../public/svg/Path162.svg';
import Input from '../../Input/Input';
import Button from '../Button/Button';
import styles from './Footer.scss';

const Footer = ({ classNameWrapper }) => (
  <footer className={cx(styles.footer, classNameWrapper)}>
    <hr className={styles.line} />
    <div className={styles.container}>
      <div className={styles.itemOne}>
        <nav>
          <h6 className={styles.menuTitle}>Покупателям</h6>
          <ul className={styles.menuItems}>
            <li>
              <Link href="info/advantages">
                <a className={styles.menuText}>
                  Преимущества
                </a>
              </Link>
            </li>
            <li>
              <Link href="info/delivery">
                <a className={styles.menuText}>
                  Доставка/Оплата
                </a>
              </Link>
            </li>
            <li>
              <Link href="info/recovery">
                <a className={styles.menuText}>
                  Возрат/Обмен
                </a>
              </Link>
            </li>
            <li>
              <Link href="info/questions">
                <a className={styles.menuText}>
                  Вопросы и Ответы
                </a>
              </Link>
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
              <Link href="/opt">
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
            <Link href="about/contacts">
              <a className={styles.menuText}>
                Контакты
              </a>
            </Link>
          </li>
          <li>
            <Link href="about/about">
              <a className={styles.menuText}>
                О магазине
              </a>
            </Link>
          </li>
          <li>
            <Link href="about/careers">
              <a className={styles.menuText}>
                Вакансии
              </a>
            </Link>
          </li>
          <li>
            <Link href="/Blog">
              <a className={styles.menuText}>
                Новости
              </a>
            </Link>
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
        <Link href="/Products">
          <a className={styles.menuLink}>
            Смотреть все
          </a>
        </Link>
      </nav>
      <form className={styles.form}>
        <h5>
          Хотите получать чаще акционные <br />
          предложения?
        </h5>
        <Input placeholder="E-mail" type="email" viewType="footerInput" />
        <div className={styles.buttonWrapper}>
          <Button
            buttonType="submit"
            title="Подписаться"
            viewType="footerButton"
            classNameWrapper={styles.footerButton}
          />
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
        <Link href="info/term-of-use">
          <a className={styles.formLink}>
            Пользовательское соглашение
          </a>
        </Link>
      </form>
    </div>
  </footer>
);

Footer.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default Footer;
