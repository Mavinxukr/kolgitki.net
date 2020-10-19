import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cookies } from '../../../utils/getCookies';
import styles from './SubNav.scss';
import { itemsCustomers } from '../../../utils/fakeFetch/footerMenu';
import IconPhone from '../../../public/svg/call-answer.svg';
import { parseText } from '../../../utils/helpers';

const SubNav = () => {
  const router = useRouter();
  const [title, activeTitle] = useState(parseText(cookies, itemsCustomers[0].name, itemsCustomers[0].name_ua));

  return (
    <div className={styles.subNavWrapper}>
      <div className={styles.subNav}>
        <div className={styles.container}>
          <div className={styles.item}>
            <p className={styles.iconBlockPhone}>
              <IconPhone className={styles.icon} />
            </p>
            <p className={`${styles.textPhone} ${styles.text}`}>
              044 495 523 395
            </p>
            <div className={styles.menu}>
              <p>{title}</p>
              <ul className={styles.subMenu}>
                {itemsCustomers.map(item => (
                  <li key={item.id}>
                    <Link
                      href={item.href}
                      as={item.href}
                      passHref
                      prefetch={false}
                    >
                      <a
                        className={styles.menuText}
                        onClick={(e) => {
                          e.preventDefault();
                          router.push(item.href);
                        }}
                      >
                        {parseText(cookies, item.name, item.name_ua)}
                      </a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNav;
