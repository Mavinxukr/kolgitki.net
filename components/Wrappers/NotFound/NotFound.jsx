import React from 'react';
import styles from './NotFound.scss';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import MainLayout from '../../Layout/Global/Global';
import IconSearch from '../../../assets/svg/search1.svg';

const NotFound = () => (
  <MainLayout>
    <div className={styles.notFound}>
      <h2>Упс! Страницы уже нет</h2>
      <form className={styles.form}>
        <input
          type="text"
          placeholder="Поиск по сайту..."
          className={styles.field}
        />
        <span className={styles.icon}>
          <IconSearch />
        </span>
      </form>
      <div className={styles.buttonRouteWrapper}>
        <ButtonRoute />
      </div>
    </div>
  </MainLayout>
);

export default NotFound;
