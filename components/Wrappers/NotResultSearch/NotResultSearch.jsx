import React from 'react';
import Link from 'next/link';
import MainLayout from '../../Layout/Global/Global';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import Button from '../../Layout/Button/Button';
import styles from './NotResultSearch.scss';

const NotResultSearch = () => (
  <MainLayout>
    <div className={styles.noResultWrapper}>
      <p>нет результатов по данному запросу</p>
      <ButtonRoute classNameWrapper={styles.buttonRouteWrapper} />
      <Link href={{
        pathname: '/Products',
        query: {
          sort_date: 'desc',
        },
      }}
      >
        <Button
          title="посмотреть новинки"
          viewType="white"
          href
          classNameWrapper={styles.buttonRouteWrapper}
        />
      </Link>
    </div>
  </MainLayout>
);

export default NotResultSearch;
