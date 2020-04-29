import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import PropTypes from 'prop-types';
import cx from 'classnames';
import IconInstagram from '../../../public/svg/instagram.svg';
import IconFacebook from '../../../public/svg/Path109.svg';
import IconTwitter from '../../../public/svg/Path162.svg';
import Input from '../../Input/Input';
import Button from '../Button/Button';
import { getAllCategories } from '../../../services/home';
import { sendMailing } from '../../../services/footer';
import { emailValidation } from '../../../utils/validation';
import { withResponse } from '../../hoc/withResponse';
import Accordion from '../../Accordion/Accordion';
import { itemsAbout, itemsCustomers, itemsWholesaleCustomers } from '../../../utils/fakeFetch/footerMenu';
import styles from './Footer.scss';

const MenuItem = ({ arrItems, isCategoriesItem }) => (
  <ul className={styles.menuItems}>
    {arrItems && arrItems.map(item => (
      <li key={item.id}>
        <Link
          href={!isCategoriesItem && item.href || {
            pathname: '/Products',
            query: {
              categories: [item.id],
              sort_popular: 'desc',
            },
          }}
          prefetch={false}
        >
          <a className={styles.menuText}>
            {item.name}
          </a>
        </Link>
      </li>
    ))}
  </ul>
);

const Footer = ({ classNameWrapper, isDesktopScreen }) => {
  const [categories, setCategories] = useState(null);
  const [isSuccessMailing, setIsSuccessMailing] = useState(false);
  const [error, setError] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    getAllCategories({}).then(response => setCategories(response.data));
  }, []);

  return (
    <footer className={cx(styles.footer, classNameWrapper)}>
      <hr className={styles.line} />
      <div className={styles.container}>
        {isDesktopScreen && (
          <>
            <div className={styles.itemOne}>
              <nav>
                <h6 className={styles.menuTitle}>Покупателям</h6>
                <MenuItem arrItems={itemsCustomers} />
              </nav>
              <nav className={styles.childNav}>
                <h6 className={`${styles.menuTitle} ${styles.menuTitleLastTitle}`}>
                  Оптовым покупателям
                </h6>
                <MenuItem arrItems={itemsWholesaleCustomers} />
              </nav>
            </div>
            <nav className={styles.itemTwo}>
              <h6 className={styles.menuTitle}>О нас</h6>
              <MenuItem arrItems={itemsAbout} />
            </nav>
            <nav className={styles.itemThree}>
              <h6 className={styles.menuTitle}>Категории</h6>
              <MenuItem arrItems={categories} />
              <Link
                href={{
                  pathname: '/Products',
                  query: { sort_popular: 'desc' },
                }
                }
                prefetch={false}
              >
                <a className={styles.menuLink}>Смотреть все</a>
              </Link>
            </nav>
          </>
        ) || (
          <ul className={styles.accordion} uk-accordion="multiple: true">
            <Accordion title="Покупателям" isFooterNav>
              <MenuItem arrItems={itemsCustomers} />
            </Accordion>
            <Accordion title="О нас" isFooterNav>
              <MenuItem arrItems={itemsAbout} />
            </Accordion>
            <Accordion title="Категории" isFooterNav>
              <MenuItem arrItems={categories} />
            </Accordion>
            <Accordion title="Оптовым покупателям" isFooterNav>
              <MenuItem arrItems={itemsWholesaleCustomers} />
            </Accordion>
          </ul>
        )}
        <form className={styles.form}>
          <div className={styles.formChildrenWrapper}>
            <h5 className={styles.titleStocks}>
              Хотите получать чаще акционные предложения?
            </h5>
            <div className={styles.controlsWrapper}>
              <Input
                addInputProps={{ value, onChange: e => setValue(e.target.value) }}
                placeholder="E-mail"
                type="email"
                classNameWrapper={styles.inputWrapper}
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
            </div>
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
          <Link href="/info/term-of-use" prefetch={false}>
            <a className={styles.formLink}>Пользовательское соглашение</a>
          </Link>
        </form>
      </div>
    </footer>
  );
};

MenuItem.propTypes = {
  arrItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    href: PropTypes.string,
    name: PropTypes.string,
  })),
  isCategoriesItem: PropTypes.bool,
};

Footer.propTypes = {
  classNameWrapper: PropTypes.string,
  isDesktopScreen: PropTypes.bool,
};

export default withResponse(Footer);
