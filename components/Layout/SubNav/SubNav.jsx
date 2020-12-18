import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { cookies } from '../../../utils/getCookies';
import styles from './SubNav.scss';
import IconPhone from '../../../public/svg/call-answer.svg';
import { parseText } from '../../../utils/helpers';

const SubNav = () => {
  const router = useRouter();

  return (
    <div className={styles.subNavWrapper}>
      <div className={styles.subNav}>
        <div className={styles.container}>
          <div className={styles.item}>
            <p className={styles.iconBlockPhone}>
              <IconPhone className={styles.icon} />
            </p>
            <p className={`${styles.textPhone} ${styles.text}`}>
              (044) 495 523 395
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubNav;
