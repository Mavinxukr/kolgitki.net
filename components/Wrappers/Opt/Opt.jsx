import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import formatString from 'format-string-by-pattern';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import IconDelivery from '../../../public/svg/free-delivery2.svg';
import IconCard from '../../../public/svg/credit-cards-payment.svg';
import IconGift from '../../../public/svg/gift.svg';
import IconQuestion from '../../../public/svg/question.svg';
import MainLayout from '../../Layout/Global/Global';
import Button from '../../Layout/Button/Button';
import { renderInput } from '../../../utils/renderInputs';
import { sendOptForm } from '../../../services/opt';
import {
  composeValidators,
  emailValidation,
  required,
  numberValidation,
  snpValidation,
} from '../../../utils/validation';
import styles from './Opt.scss';

const InfoCard = ({ title, desc, children }) => (
  <article className={styles.card}>
    <h4 className={styles.cardTitle}>
      {children} {title}
    </h4>
    <p className={styles.cardDesc}>{desc}</p>
  </article>
);

const Opt = () => {
  const [isSuccess, setIsSuccess] = useState(false);

  const onSubmit = (values) => {
    sendOptForm({}, values)
      .then((response) => {
        if (response.status) {
          setIsSuccess(true);
        } else {
          setIsSuccess(false);
        }
      });
  };

  return (
    <MainLayout>
      <div className={styles.opt}>
        <BreadCrumbs items={[{
          id: 1,
          name: 'Главная',
          pathname: '/',
        },
        {
          id: 2,
          name: 'Оптовым покупателям',
        }]}
        />
        <div className={styles.content}>
          <h2 className={styles.title}>Оптовым покупателям</h2>
          <InfoCard
            title="Зачем становится оптовым покупателям?"
            desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
          >
            <IconQuestion className={styles.icon} />
          </InfoCard>
          <InfoCard
            title="Сборка заказа"
            desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
          >
            <IconGift className={styles.icon} />
          </InfoCard>
          <InfoCard
            title="Доставка"
            desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
          >
            <IconDelivery className={styles.icon} />
          </InfoCard>
          <InfoCard
            title="Оплата"
            desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
          >
            <IconCard className={styles.icon} />
          </InfoCard>
          <div className={styles.requestBlock}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, invalid, submitting }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h4>Отправить заявку</h4>
                  <div className={styles.inputGroup}>
                    <Field
                      name="name"
                      validate={composeValidators(required, snpValidation)}
                    >
                      {renderInput({
                        placeholder: '* Имя',
                        type: 'text',
                        viewTypeForm: 'profileForm',
                        classNameWrapper: styles.inputGroupWrapper,
                        classNameWrapperForInput: styles.inputChildWrapper,
                      })}
                    </Field>
                    <Field
                      name="phone"
                      validate={composeValidators(required, numberValidation)}
                      parse={formatString('+38 (099) 999 99 99')}
                    >
                      {renderInput({
                        placeholder: '* + 380 ( ___ ) ___ - __ - __',
                        type: 'text',
                        viewTypeForm: 'profileForm',
                        classNameWrapper: styles.inputGroupWrapper,
                        classNameWrapperForInput: styles.inputChildWrapper,
                      })}
                    </Field>
                  </div>
                  <Field
                    name="email"
                    validate={composeValidators(required, emailValidation)}
                  >
                    {renderInput({
                      placeholder: '* E-mail',
                      type: 'email',
                      viewTypeForm: 'profileForm',
                      classNameWrapper: styles.inputWrapper,
                      classNameWrapperForInput: styles.inputChildWrapper,
                    })}
                  </Field>
                  <Field name="description">
                    {({ input }) => (
                      <textarea
                        rows="4"
                        placeholder="Комментарий"
                        onChange={(e) => {
                          input.onChange(e.target.value);
                        }}
                        className={styles.textField}
                        value={input.value}
                      />
                    )}
                  </Field>
                  <Button
                    classNameWrapper={styles.formButton}
                    title="Отправить"
                    viewType="black"
                    buttonType="submit"
                    disabled={invalid || submitting}
                  />
                  {isSuccess && (
                    <p>заявка отправлена успешно</p>
                  )}
                </form>
              )}
            />
            <div className={styles.info}>
              <h2 className={styles.infoTitle}>Контакты</h2>
              <p className={styles.infoEmail}>hello@kolgot.net</p>
              <p className={styles.numbers}>
                <span className={styles.number}>0 (800) 645 323 55</span>
                <span className={styles.number}>0 (800) 645 323 55</span>
                <span className={styles.number}>0 (800) 645 323 55</span>
              </p>
              <button className={styles.buttonTelegram} type="button">
                Telegram
              </button>
              <button type="button" className={styles.buttonViber}>
                Viber
              </button>
            </div>
          </div>
          <div className={styles.optLinks}>
            <a href="https://www.facebook.com/kolgot.net/" download className={styles.itemLink}>
              Скачать шаблон заявки
            </a>
            <a href="https://www.instagram.com/kolgot_net/" download className={styles.itemLink}>
              Скачать стандартное комерческое предложение
            </a>
            <a href="/" download className={styles.itemLink}>
              Скачать каталог
            </a>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string,
  desc: PropTypes.string,
  children: PropTypes.node,
};

export default Opt;
