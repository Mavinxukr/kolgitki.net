import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import cx from 'classnames';
import IconInstagram from '../../../public/svg/instagram.svg';
import IconFacebook from '../../../public/svg/Path109.svg';
import IconTwitter from '../../../public/svg/Path162.svg';
import Input from '../../Input/Input';
import Button from '../Button/Button';
import Loader from '../../Loader/Loader';
import { getAllCategories } from '../../../services/home';
import { sendMailing } from '../../../services/footer';
import { emailValidation } from '../../../utils/validation';
import styles from './Footer.scss';

const Footer = ({ classNameWrapper }) => {
  const [categories, setCategories] = useState(null);
  const [isSuccessMailing, setIsSuccessMailing] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  const router = useRouter();

  useEffect(() => {
    getAllCategories({}).then(response => setCategories(response.data));
  }, []);

  if (!categories) {
    return <Loader />;
  }

  return (
    <footer className={cx(styles.footer, classNameWrapper)}>
      <hr className={styles.line} />
      <div className={styles.container}>
        <div className={styles.itemOne}>
          <nav>
            <h6 className={styles.menuTitle}>Покупателям</h6>
            <ul className={styles.menuItems}>
              <li>
                <Link href="/info/advantages" passHref>
                  <a
                    className={styles.menuText}
                  >Преимущества
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/info/delivery" passHref>
                  <a
                    className={styles.menuText}
                  >Доставка/Оплата
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/info/recovery" passHref>
                  <a
                    className={styles.menuText}
                  >Возрат/Обмен
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/info/questions" passHref>
                  <a
                    className={styles.menuText}
                  >Вопросы и Ответы
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
              <Link href="/about/contacts">
                <a className={styles.menuText}>Контакты</a>
              </Link>
            </li>
            <li>
              <Link href="/about/about">
                <a className={styles.menuText}>О магазине</a>
              </Link>
            </li>
            <li>
              <Link href="/about/careers">
                <a className={styles.menuText}>Вакансии</a>
              </Link>
            </li>
            <li>
              <Link href="/Blog">
                <a className={styles.menuText}>Новости</a>
              </Link>
            </li>
          </ul>
        </nav>
        <nav className={styles.itemThree}>
          <h6 className={styles.menuTitle}>Категории</h6>
          <ul className={styles.menuItems}>
            {categories.map(item => (
              <li key={item.id}>
                <Link
                  href={{
                    pathname: '/Products',
                    query: {
                      categories: [item.id],
                      sort_popular: 'desc',
                    },
                  }}
                >
                  <a className={styles.menuText}>{item.name}</a>
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/Products">
            <a className={styles.menuLink}>Смотреть все</a>
          </Link>
        </nav>
        <form className={styles.form}>
          <h5>
            Хотите получать чаще акционные <br />
            предложения?
          </h5>
          <Input
            addInputProps={{ value, onChange: e => setValue(e.target.value) }}
            placeholder="E-mail"
            type="email"
            viewType="footerInput"
          />
          {(isSuccessMailing && <p>Вы подписаны успешно</p>)
            || (error.length > 0 && <p>{error}</p>)
            || (!!emailValidation(value) && value.length > 0 && (
              <p>{emailValidation(value)}</p>
            ))}
          <div className={styles.buttonWrapper}>
            <Button
              buttonType="button"
              title="Подписаться"
              viewType="footerButton"
              classNameWrapper={styles.footerButton}
              disabled={!!emailValidation(value)}
              onClick={() => {
                sendMailing({}, { email: value }).then((response) => {
                  if (response.status) {
                    setIsSuccessMailing(true);
                    setValue('');
                  } else {
                    setError(
                      'не удалось оформить подписку, видимо пользователь с таким email уже подписался',
                    );
                  }
                });
              }}
            />
          </div>
          <div className={styles.formIcons}>
            <a className={styles.formIcon} href="/">
              <IconFacebook className={styles.iconFacebook} />
            </a>
            <a className={styles.formIcon} href="/">
              <IconInstagram />
            </a>
            <a className={styles.formIcon} href="/">
              <IconTwitter />
            </a>
          </div>
          <Link href="/info/term-of-use">
            <a className={styles.formLink}>Пользовательское соглашение</a>
          </Link>
        </form>
      </div>
    </footer>
  );
};

Footer.propTypes = {
  classNameWrapper: PropTypes.string,
};

export default Footer;
