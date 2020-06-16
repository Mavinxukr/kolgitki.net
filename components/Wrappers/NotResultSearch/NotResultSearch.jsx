import React from 'react';
import Link from 'next/link';
import { cookies } from '../../../utils/getCookies';
import { setFiltersInCookies, parseText } from '../../../utils/helpers';
import MainLayout from '../../Layout/Global/Global';
import ButtonRoute from '../../Layout/ButtonRoute/ButtonRoute';
import Button from '../../Layout/Button/Button';
import styles from './NotResultSearch.scss';

const NotResultSearch = () => (
  <MainLayout>
    <div className={styles.noResultWrapper}>
      <p>
        {parseText(
          cookies,
          'нет результатов по данному запросу',
          'немає результатів по даному запиту',
        )}
      </p>
      <ButtonRoute classNameWrapper={styles.buttonRouteWrapper} />
      <Link
        href={{
          pathname: '/Products',
        }}
        as="/Products_sort-date"
        prefetch={false}
      >
        <Button
          title="посмотреть новинки"
          titleUa="переглянути новинки"
          viewType="white"
          href
          classNameWrapper={styles.buttonRouteWrapper}
          onClick={() => {
            setFiltersInCookies(cookies, {
              sort_date: 'desc',
            });
          }}
        />
      </Link>
    </div>
  </MainLayout>
);

export default NotResultSearch;
