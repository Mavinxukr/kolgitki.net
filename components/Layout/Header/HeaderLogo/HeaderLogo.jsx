import Link from 'next/link';
import React from 'react';
import styles from './HeaderLogo.scss';

export const HeaderLogo = () => (
  <Link href="/" prefetch={false} passHref>
    <a className={styles.link}>
      <img className={styles.img} src="/images/logo_cut@2x.png" alt="logo" />
    </a>
  </Link>
);
