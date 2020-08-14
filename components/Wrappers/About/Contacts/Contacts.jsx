import React, { useState } from 'react';
import cx from 'classnames';
import { Field, Form } from 'react-final-form';
import formatString from 'format-string-by-pattern';
import { cookies } from '../../../../utils/getCookies';
import { parseText } from '../../../../utils/helpers';
import Button from '../../../Layout/Button/Button';
import { renderInput } from '../../../../utils/renderInputs';
import {
  composeValidators,
  emailValidation,
  numberValidation,
  snpValidation,
  required,
} from '../../../../utils/validation';
import { sendFeedback } from '../../../../services/About/contacts';
import styles from './Contacts.scss';

const Contacts = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (values) => {
    sendFeedback({}, values).then((response) => {
      if (response.status) {
        setIsSuccess(true);
      }
    });
  };

  return (
    <div className={styles.contacts}>
      <h2 className={styles.title}>
        {parseText(cookies, 'Контакты', 'Контакти')}
      </h2>
      <p className={styles.descContact}>
        {parseText(cookies, 'Обратная связь', "Зворотній зв'язок")}
      </p>
      <div className={styles.contactInfoWrapper}>
        <div className={styles.contactInfo}>
          <div className={styles.contactInfoItem}>
            <p className={styles.email}>hello@kolgot.net</p>
            <ul className={styles.numbers}>
              <li className={styles.number}>0 (800) 645 323 55</li>
              <li className={styles.number}>0 (800) 865 456 23</li>
              <li className={styles.number}>0 (800) 632 334 15</li>
            </ul>
          </div>
          <div className={styles.contactInfoItem}>
            <h5>{parseText(cookies, 'Время работы', 'Час роботи')}</h5>
            <ul className={styles.timeSections}>
              <li className={styles.timeSection}>Пн. - Пт. 10:00 — 21:00</li>
              <li className={styles.timeSection}>Сб. 12:00 — 20:00</li>
              <li className={styles.timeSection}>
                {parseText(cookies, 'Вс. Выходной', 'Нд. Вихідний')}
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.contactAddInfo}>
          <div className={styles.links}>
            <a className={styles.link} href="https://t.me/kolgot_net">
              Telegram
            </a>
            <a
              className={styles.link}
              href="viber://contact?number=380980181100"
            >
              Viber
            </a>
          </div>
          <p className={styles.desc}>
            {parseText(
              cookies,
              'Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали, что не каждый учащийся.',
              'Підтримувати високі очікування для студентів з обмеженими можливостями. Опитані визнали, що не кожен учень.',
            )}
          </p>
        </div>
      </div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formWrapper}>
              <div className={styles.inputsWrapper}>
                <div className={styles.inputsGroup}>
                  <Field
                    type="text"
                    name="name"
                    validate={composeValidators(required, snpValidation)}
                    render={renderInput({
                      placeholder: '* Имя',
                      placeholderUa: "* Ім'я",
                      viewTypeForm: 'profileForm',
                      classNameWrapper: styles.inputWrapperSmall,
                    })}
                  />
                  <Field
                    type="text"
                    name="phone"
                    validate={composeValidators(required, numberValidation)}
                    parse={formatString('+38 (999) 999 99 99')}
                    render={renderInput({
                      placeholder: '* + 38 ( ___ ) ___ - __ - __',
                      placeholderUa: '* + 38 ( ___ ) ___ - __ - __',
                      viewTypeForm: 'profileForm',
                      classNameWrapper: styles.inputWrapperSmall,
                    })}
                  />
                </div>
                <Field
                  type="email"
                  name="email"
                  validate={composeValidators(required, emailValidation)}
                  render={renderInput({
                    placeholder: '* E-mail',
                    placeholderUa: '* E-mail',
                    viewTypeForm: 'profileForm',
                    classNameWrapper: styles.emailWrapper,
                  })}
                />
                <Field name="comment">
                  {({ input }) => (
                    <textarea
                      {...input}
                      className={styles.orderField}
                      placeholder={parseText(
                        cookies,
                        'Комментарий',
                        'Коментар',
                      )}
                    />
                  )}
                </Field>
              </div>
              <Button
                classNameWrapper={styles.formButton}
                type="submit"
                title="Отправить"
                disabled={isSuccess}
                titleUa="Надіслати"
                viewType="black"
              />
              {isSuccess && (
                <p className={styles.bgSuccess}>
                  <h3 className={styles.successTitle}>
                    {parseText(
                      cookies,
                      'Вопрос успешно отправлен.',
                      'Відгук успішно відправлений',
                    )}
                  </h3>
                  <p className={styles.successTitle}>
                    {parseText(
                      cookies,
                      'Мы свяжемся с вами в ближайшее время.',
                      "Ми зв'яжемося з вами найближчим часом.",
                    )}
                  </p>
                </p>
              )}
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default Contacts;
