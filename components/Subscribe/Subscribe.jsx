import React, { useState } from 'react';
import Input from '../Input/Input';
import { cookies } from '../../utils/getCookies';
import { parseText } from '../../utils/helpers';
import styles from './Subscribe.scss';
import { emailValidation } from '../../utils/validation';
import Button from '../Layout/Button/Button';
import { sendMailing } from '../../services/footer';

export const Subscribe = () => {
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const [isSuccessMailing, setIsSuccessMailing] = useState(false);

  return (
    <form className={styles.form}>
      <h5 className={styles.form_title}>
        {parseText(
          cookies,
          'Хотите получать чаще акционные предложения?',
          'Хочете отримувати частіше акційні пропозиції?'
        )}
      </h5>
      <div className={styles.form_inputBlock}>
        <Input
          addInputProps={{
            value,
            onChange: e => setValue(e.target.value),
            onBlur: () => emailValidation(value)
          }}
          placeholder="Ваш E-mail"
          placeholderUa="Ваш E-mail"
          type="email"
          viewType="footerInput"
        />
        <div className={styles.mobileButtonWrapper}>
          <Button
            buttonType="button"
            title="Подписаться"
            titleUa="Підписатися"
            viewType={!emailValidation(value) ? 'red' : 'footerButton'}
            classNameWrapper={styles.footerButton}
            disabled={!!emailValidation(value)}
            onClick={() => {
              sendMailing({}, { email: value }).then(response => {
                if (response.status) {
                  setIsSuccessMailing(true);
                  setValue('');
                } else {
                  setError(
                    parseText(
                      cookies,
                      'не удалось оформить подписку, видимо пользователь с таким email уже подписался',
                      'Не вдалося оформити підписку, мабуть користувач з таким email вже підписався'
                    )
                  );
                }
              });
            }}
          />
        </div>
      </div>
      <div className={styles.messageBlock}>
        {(isSuccessMailing && (
          <p className={styles.errorParagraph}>
            {parseText(cookies, 'Вы подписаны успешно', 'Ви підписані успішно')}
          </p>
        )) ||
          (error.length > 0 && (
            <p className={styles.errorInputText}>{error}</p>
          )) ||
          (!!emailValidation(value) && value.length > 0 && (
            <p className={styles.errorInputText}>{emailValidation(value)}</p>
          ))}
      </div>

      <div className={styles.desctopButtonWrapper}>
        <Button
          buttonType="button"
          title="Подписаться"
          titleUa="Підписатися"
          viewType={!emailValidation(value) ? 'red' : 'footerButton'}
          classNameWrapper={styles.footerButton}
          disabled={!!emailValidation(value)}
          onClick={() => {
            sendMailing({}, { email: value }).then(response => {
              if (response.status) {
                setIsSuccessMailing(true);
                setValue('');
              } else {
                setError(
                  parseText(
                    cookies,
                    'не удалось оформить подписку, видимо пользователь с таким email уже подписался',
                    'Не вдалося оформити підписку, мабуть користувач з таким email вже підписався'
                  )
                );
              }
            });
          }}
        />
      </div>
    </form>
  );
};
