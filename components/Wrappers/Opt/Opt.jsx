import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import formatString from 'format-string-by-pattern';
import BreadCrumbs from '../../Layout/BreadCrumbs/BreadCrumbs';
import IconDelivery from '../../../public/svg/free-delivery3.svg';
import IconCard from '../../../public/svg/credit-cards-payment1.svg';
import IconGift from '../../../public/svg/gift1.svg';
import IconQuestion from '../../../public/svg/question1.svg';
import MainLayout from '../../Layout/Global/Global';
import Button from '../../Layout/Button/Button';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import { renderInput } from '../../../utils/renderInputs';
import { getDocs, sendOptForm } from '../../../services/opt';
import {
  composeValidators,
  emailValidation,
  required,
  numberValidation,
  snpValidation
} from '../../../utils/validation';
import styles from './Opt.scss';

const InfoCard = ({ title, titleUa, desc, descUa, children }) => (
  <article className={styles.card}>
    <h5 className={styles.cardTitle}>
      {children} {parseText(cookies, title, titleUa)}
    </h5>
    <p className={styles.cardDesc}>{parseText(cookies, desc, descUa)}</p>
  </article>
);

const Opt = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [docs, setDocs] = useState(null);

  useEffect(() => {
    console.log(docs);
  }, [docs]);

  useEffect(() => {
    getDocs({}).then(response => setDocs(response.data));
  }, []);

  const onSubmit = values => {
    sendOptForm({}, values).then(response => {
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
        <BreadCrumbs
          items={[
            {
              id: 1,
              name: 'Главная',
              nameUa: 'Головна',
              pathname: '/'
            },
            {
              id: 2,
              name: 'Оптовым покупателям',
              nameUa: 'Оптовим покупцям'
            }
          ]}
        />
        <div className={styles.content}>
          <h3 className={styles.title}>
            {parseText(cookies, 'Оптовым покупателям', 'Оптовим покупцям')}
          </h3>
          <InfoCard
            title="Зачем становится оптовым покупателям?"
            titleUa="Навіщо стає оптовим покупцям"
            desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
            descUa="Підтримувати високі очікування для студентів з обмеженими можливостями. Опитані визнали,
       що не кожен учень з обмеженими можливостями може досягти високих стандартів, але вони порекомендували
        дотримуватися високих очікувань і підтримувати тиск на систему, щоб забезпечити навчання на більш високому рівні."
          >
            <IconQuestion className={styles.icon} />
          </InfoCard>
          <InfoCard
            title="Сборка заказа"
            titleUa="Збірка замовлення"
            desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
            descUa="Підтримувати високі очікування для студентів з обмеженими можливостями. Опитані визнали,
       що не кожен учень з обмеженими можливостями може досягти високих стандартів, але вони порекомендували
        дотримуватися високих очікувань і підтримувати тиск на систему, щоб забезпечити навчання на більш високому рівні."
          >
            <IconGift className={styles.icon} />
          </InfoCard>
          <InfoCard
            title="Доставка"
            desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
            descUa="Підтримувати високі очікування для студентів з обмеженими можливостями. Опитані визнали,
       що не кожен учень з обмеженими можливостями може досягти високих стандартів, але вони порекомендували
        дотримуватися високих очікувань і підтримувати тиск на систему, щоб забезпечити навчання на більш високому рівні."
          >
            <IconDelivery className={styles.icon} />
          </InfoCard>
          <InfoCard
            title="Оплата"
            desc="Поддерживать высокие ожидания для студентов с ограниченными возможностями. Опрошенные признали,
       что не каждый учащийся с ограниченными возможностями может достичь высоких стандартов, но они порекомендовали
        придерживаться высоких ожиданий и поддерживать давление на систему, чтобы обеспечить обучение на более высоком уровне."
            descUa="Підтримувати високі очікування для студентів з обмеженими можливостями. Опитані визнали,
       що не кожен учень з обмеженими можливостями може досягти високих стандартів, але вони порекомендували
        дотримуватися високих очікувань і підтримувати тиск на систему, щоб забезпечити навчання на більш високому рівні."
          >
            <IconCard className={styles.icon} />
          </InfoCard>
          <div className={styles.requestBlock}>
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, invalid, submitting }) => (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <h5 className={styles.formTitle}>
                    {parseText(cookies, 'Отправить заявку', 'Відправити запит')}
                  </h5>
                  <div className={styles.inputGroup}>
                    <Field
                      name="name"
                      validate={composeValidators(required, snpValidation)}
                    >
                      {renderInput({
                        placeholder: '* Имя',
                        placeholderUa: "* Ім'я",
                        type: 'text',
                        viewTypeForm: 'profileForm',
                        classNameWrapper: styles.inputGroupWrapper,
                        classNameWrapperForInput: styles.inputChildWrapper
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
                        classNameWrapperForInput: styles.inputChildWrapper
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
                      classNameWrapperForInput: styles.inputChildWrapper
                    })}
                  </Field>
                  <Field name="description">
                    {({ input }) => (
                      <textarea
                        rows="4"
                        placeholder={parseText(
                          cookies,
                          'Комментарий',
                          'Коментар'
                        )}
                        onChange={e => {
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
                    titleUa="Надіслати"
                    viewType="black"
                    buttonType="submit"
                    disabled={submitting}
                  />
                  {isSuccess && (
                    <p className={styles.bgSuccess}>
                      <h4 className={styles.successTitle}>
                        {parseText(
                          cookies,
                          'Заявка отправлена успешно',
                          'Заявка відправлена успішно'
                        )}
                      </h4>
                      <p className={styles.successTitle}>
                        {parseText(
                          cookies,
                          'Спасибо, ваша заявка в обработке',
                          'Cпасибі, ваша заявка в обробці'
                        )}
                      </p>
                    </p>
                  )}
                </form>
              )}
            />
            <div className={styles.info}>
              <h3 className={styles.infoTitle}>
                {parseText(cookies, 'Контакты', 'Контакти')}
              </h3>
              <div className={styles.textInfoWrapper}>
                <p className={styles.infoEmail}>hello@kolgot.net</p>
                <p className={styles.numbers}>
                  <span className={styles.number}>0 (800) 645 323 55</span>
                  <span className={styles.number}>0 (800) 645 323 55</span>
                  <span className={styles.number}>0 (800) 645 323 55</span>
                </p>
              </div>
              <a
                href="https://t.me/kolgot_net"
                className={styles.buttonTelegram}
              >
                Telegram
              </a>
              <a
                href="viber://contact?number=380980181100"
                className={styles.buttonViber}
              >
                Viber
              </a>
            </div>
          </div>
          <div className={styles.optLinks}>
            {!!docs?.[0].shablon && (
              <a href={docs[0].shablon} download className={styles.itemLink}>
                {parseText(
                  cookies,
                  'Скачать шаблон заявки',
                  'Завантажити шаблон заявки'
                )}
              </a>
            )}
            {!!docs?.[0].offer && (
              <a href={docs?.[0].offer} download className={styles.itemLink}>
                {parseText(
                  cookies,
                  'Скачать стандартное комерческое предложение',
                  'Завантажити стандартну комерційну пропозицію'
                )}
              </a>
            )}

            {!!docs?.[0].catalog && (
              <a href={docs?.[0].catalog} download className={styles.itemLink}>
                {parseText(cookies, 'Скачать каталог', 'Завантажити каталог')}
              </a>
            )}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

InfoCard.propTypes = {
  title: PropTypes.string,
  titleUa: PropTypes.string,
  desc: PropTypes.string,
  descUa: PropTypes.string,
  children: PropTypes.node
};

export default Opt;
