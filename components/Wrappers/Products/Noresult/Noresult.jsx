import { useRouter } from 'next/router';
import React from 'react';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import Button from '../../../Layout/Button/Button';
import styles from './Noresult.scss';

export const Noresult = () => {
  const router = useRouter();

  return (
    <div className={styles.noresultBlock}>
      <p className={styles.notFoundText}>
        {parseText(
          cookies,
          'К сожалению, ничего не найдено. Пожалуйста, измените ваш запрос',
          'На жаль, нічого не знайдено. Будь ласка, поміняйте ваш запит'
        )}
      </p>
      <div className={styles.buttonsBlock}>
        <Button
          title="Перейти на главную"
          titleUa="Перейти на головну"
          buttonType="button"
          viewType="black"
          onClick={() => {
            router.push('/');
          }}
        />

        <Button
          title="Посмотреть новинки"
          titleUa="Переглянути новинки"
          buttonType="button"
          viewType="white"
          onClick={() => {
            router.push('/products');
          }}
        />
      </div>
    </div>
  );
};
