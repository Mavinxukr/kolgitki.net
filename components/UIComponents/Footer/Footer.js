import React from 'react';
import IconInstagram from '../../../assets/svg/instagram.svg';
import IconFacebook from '../../../assets/svg/Path 109.svg';
import IconTwitter from '../../../assets/svg/Path 162.svg';
import Styles from './Footer.module.scss';

const Footer = () => (
  <footer className={Styles.Footer}>
    <hr className={Styles.Footer__Line} />
    <div className={Styles.Footer__Container}>
      <div className={Styles.Footer__ItemOne}>
        <nav>
          <h2 className={Styles.Footer__MenuTitle}>Покупателям</h2>
          <ul className={Styles.Footer__MenuItems}>
            <li>
              <a className={Styles.Footer__MenuText} href="/">Преимущества</a>
            </li>
            <li>
              <a className={Styles.Footer__MenuText} href="/">Доставка/Оплата</a>
            </li>
            <li>
              <a className={Styles.Footer__MenuText} href="/">Возрат/Обмен</a>
            </li>
            <li>
              <a className={Styles.Footer__MenuText} href="/">Вопросы и Ответы</a>
            </li>
          </ul>
        </nav>
        <nav className={Styles.Footer__ChildNav}>
          <h2 className={Styles.Footer__MenuTitle}>Оптовым покупателям</h2>
          <ul className={Styles.Footer__MenuItems}>
            <li>
              <a className={Styles.Footer__MenuText} href="/">Общая информация</a>
            </li>
            <li>
              <a className={Styles.Footer__MenuText} href="/">Скачать .pdf</a>
            </li>
          </ul>
        </nav>
      </div>
      <nav className={Styles.Footer__ItemTwo}>
        <h2 className={Styles.Footer__MenuTitle}>О нас</h2>
        <ul className={Styles.Footer__MenuItems}>
          <li>
            <a className={Styles.Footer__MenuText} href="/">Контакты</a>
          </li>
          <li>
            <a className={Styles.Footer__MenuText} href="/">О магазине</a>
          </li>
          <li>
            <a className={Styles.Footer__MenuText} href="/">Вакансии</a>
          </li>
          <li>
            <a className={Styles.Footer__MenuText}>Новости</a>
          </li>
        </ul>
      </nav>
      <nav className={Styles.Footer__ItemThree}>
        <h2 className={Styles.Footer__MenuTitle}>Категории</h2>
        <ul className={Styles.Footer__MenuItems}>
          <li>
            <a className={Styles.Footer__MenuText} href="/">Колготки</a>
          </li>
          <li>
            <a className={Styles.Footer__MenuText} href="/">Чулки</a>
          </li>
          <li>
            <a className={Styles.Footer__MenuText} href="/">Нижнее белье</a>
          </li>
          <li>
            <a className={Styles.Footer__MenuText} href="/">Одежда</a>
          </li>
          <li>
            <a className={Styles.Footer__MenuText} href="/">Носки</a>
          </li>
          <li>
            <a className={Styles.Footer__MenuText} href="/">Для детей</a>
          </li>
        </ul>
        <a href="/" className={Styles.Footer__MenuLink}>Смотреть все</a>
      </nav>
      <form className={Styles.Footer__Form}>
        <h2 className={Styles.Footer__TitleForm}>
          Хотите получать чаще акционные <br />
          предложения?
        </h2>
        <input className={Styles.Footer__Field} placeholder="Ваш E-mail" type="email" required="required" />
        <div className={Styles.Footer__ButtonWrapper}>
          <button type="submit" className={Styles.Footer__FormButton}>Подписаться</button>
        </div>
        <div className={Styles.Footer__FormIcons}>
          <a className={Styles.Footer__FormIcon} href="/">
            <IconFacebook />
          </a>
          <a className={Styles.Footer__FormIcon} href="/">
            <IconInstagram />
          </a>
          <a className={Styles.Footer__FormIcon} href="/">
            <IconTwitter />
          </a>
        </div>
        <a href="/" className={Styles.Footer__FormLink}>Пользовательское соглашение</a>
      </form>
    </div>
  </footer>
);

export default Footer;
