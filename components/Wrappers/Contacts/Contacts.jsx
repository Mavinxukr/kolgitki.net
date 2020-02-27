import React from 'react';
import { Field, Form } from 'react-final-form';
import formatString from 'format-string-by-pattern';
import Button from '../../Layout/Button/Button';
import { renderInput } from '../../../utils/renderInputs';
import {
  composeValidators,
  emailValidation,
  numberValidation,
  snpValidation,
  required,
} from '../../../utils/validation';
import styles from './Contacts.scss';

const onSubmit = (values) => {
  console.log(values);
};

const Contacts = () => (
  <div className={styles.contacts}>
    <h2>Контакты</h2>
    <p className={styles.descContact}>Обратная связь</p>
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
        <h5>Время работы</h5>
        <ul className={styles.timeSections}>
          <li className={styles.timeSection}>Пн. - Пт. 10:00 — 21:00</li>
          <li className={styles.timeSection}>Сб. 12:00 — 20:00</li>
          <li className={styles.timeSection}>Вс. Выходной</li>
        </ul>
      </div>
    </div>
    <div className={styles.links}>
      <a className={styles.link} href="/">
        Telegram
      </a>
      <a className={styles.link} href="/">
        Viber
      </a>
    </div>
    <p className={styles.desc}>
      Поддерживать высокие ожидания для студентов с ограниченными возможностями.
      Опрошенные признали, что не каждый учащийся.
    </p>
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, invalid }) => (
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputsWrapper}>
            <div className={styles.inputsGroup}>
              <Field
                type="text"
                name="name"
                validate={composeValidators(required, snpValidation)}
                render={renderInput({
                  placeholder: 'Имя',
                  viewTypeForm: 'profileForm',
                  classNameWrapper: styles.inputWrapperSmall,
                })}
              />
              <Field
                type="text"
                name="phone"
                validate={composeValidators(required, numberValidation)}
                parse={formatString('+380 (99) 999 99 99')}
                render={renderInput({
                  placeholder: '* + 380 ( ___ ) ___ - __ - __',
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
                viewTypeForm: 'profileForm',
                classNameWrapper: styles.emailWrapper,
              })}
            />
            <Field name="comment">
              {({ input }) => (
                <textarea
                  {...input}
                  className={styles.orderField}
                  placeholder="Комментарий"
                />
              )}
            </Field>
          </div>
          <Button
            classNameWrapper={styles.formButton}
            type="submit"
            disabled={submitting || invalid}
            title="Отправить"
            viewType="black"
          />
        </form>
      )}
    />
  </div>
);

export default Contacts;
