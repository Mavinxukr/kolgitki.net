import React, { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import cx from 'classnames';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
import { useDropzone } from 'react-dropzone';
import formatString from 'format-string-by-pattern';
import { cookies } from '../../../../utils/getCookies';
import Button from '../../../Layout/Button/Button';
import {
  composeValidators,
  snpValidation,
  numberValidation,
  required,
} from '../../../../utils/validation';
import { renderInput } from '../../../../utils/renderInputs';
import { sendCandidate } from '../../../../services/About/careers';
import { parseText } from '../../../../utils/helpers';
import styles from './Careers.scss';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false },
);

const FeatureCard = ({ src, text, textUa }) => (
  <article className={styles.cardWrapper}>
    <img src={src} alt={src} />
    <h5 className={styles.cardText}>{parseText(cookies, text, textUa)}</h5>
  </article>
);

const DropDownItem = ({ item }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  const onSubmit = async (values) => {
    const response = await sendCandidate(
      {},
      {
        ...values,
        file: selectedFile,
        vacancy_id: item.id,
      },
    );
    if (response.status) {
      setIsSuccess(true);
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={styles.info}>
      <div
        className={styles.infoDesc}
        dangerouslySetInnerHTML={{
          __html: parseText(cookies, item.search, item.search_ua),
        }}
      />
      <div
        className={styles.infoDesc}
        dangerouslySetInnerHTML={{
          __html: parseText(cookies, item.offer, item.offer_ua),
        }}
      />
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h6 className={styles.formTitle}>
              {parseText(cookies, 'Подать заявку', 'Подати заявку')}
            </h6>
            <div className={styles.inputWrapper}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button className={styles.loadController} type="button">
                  {parseText(
                    cookies,
                    '+ Загрузить резюме',
                    '+ Завантажити резюме',
                  )}
                </button>
                <p className={styles.indexText}>
                  {(selectedFile && selectedFile.name)
                    || parseText(
                      cookies,
                      'Резюме обязательно, загрузите резюме',
                      "Резюме обов'язкове, завантажте резюме",
                    )}
                </p>
              </div>
              <div className={styles.inputGroup}>
                <Field
                  name="name"
                  type="text"
                  validate={composeValidators(required, snpValidation)}
                  render={renderInput({
                    placeholder: 'Имя',
                    placeholderUa: "Ім'я",
                    classNameWrapper: styles.textFieldWrapper,
                    viewTypeForm: 'profileForm',
                  })}
                />
                <Field
                  type="text"
                  name="phone"
                  validate={composeValidators(required, numberValidation)}
                  parse={formatString('+38 (999) 999 99 99')}
                  render={renderInput({
                    placeholder: '* + 380 ( ___ ) ___ - __ - __',
                    placeholderUa: '* + 380 ( ___ ) ___ - __ - __',
                    viewTypeForm: 'profileForm',
                    classNameWrapper: styles.textFieldWrapper,
                  })}
                />
              </div>
            </div>
            <Button
              classNameWrapper={styles.formButton}
              buttonType="submit"
              disabled={submitting}
              title="Отправить"
              titleUa="Надіслати"
              viewType="black"
            />
            {isSuccess && (
              <p className={cx(styles.indexText, styles.bgSuccess)}>
                <h3 className={styles.successTitle}>
                  {parseText(
                    cookies,
                    'Вы успешно откликнулись',
                    'Ви успішно відгукнулися',
                  )}
                </h3>
                <p className={styles.successTitle}>
                  {parseText(
                    cookies,
                    `Вы успешно откликнулись на вакансию: «${item.name}» в компанию «Kolgot.net»`,
                    `Ви успішно відгукнулися а вакансію: «${item.name_ua}» в компанию «Kolgot.net»`,
                  )}
                </p>
              </p>
            )}
          </form>
        )}
      />
    </div>
  );
};

const Careers = ({ vacancies }) => {
  const [indexActive, setIndexActive] = useState(0);

  const onSetIndexAccordion = (id) => {
    if (indexActive === id) {
      setIndexActive(0);
    } else {
      setIndexActive(id);
    }
  };

  return (
    <div className={styles.careers}>
      <h3 className={styles.title}>
        {parseText(cookies, 'Вакансии', 'Вакансії')}
      </h3>
      <ul className={styles.accordion} uk-accordion="multiple: true">
        {vacancies.map(item => (
          <DynamicComponentWithNoSSRAccordion
            key={item.id}
            classNameWrapper={styles.item}
            addClassNameWrapper={styles.itemOpen}
            title={item.name}
            titleUk={item.name_ua}
            setIndexActive={() => onSetIndexAccordion(item.id)}
            isCurrentAccordionActive={indexActive === item.id}
          >
            <DropDownItem item={item} />
          </DynamicComponentWithNoSSRAccordion>
        ))}
      </ul>
      <div className={styles.featuresWrapper}>
        <h3 className={styles.title}>
          {parseText(
            cookies,
            'Почему у нас классно работать?',
            'Чому у нас класно працювати',
          )}
        </h3>
        <div className={styles.cards}>
          <FeatureCard
            text="Официальное оформление"
            textUa="Офіційне оформлення"
            src="/images/icons81.png"
          />
          <FeatureCard
            text="Скидка сотрудника на всю продукцию"
            textUa="Знижка співробітника на всю продукцію"
            src="/images/icons82.png"
          />
          <FeatureCard
            text="Дружный коллектив"
            textUa="Дружній колектив"
            src="/images/icons83.png"
          />
        </div>
      </div>
    </div>
  );
};

Careers.propTypes = {
  vacancies: PropTypes.arrayOf(PropTypes.object),
};

DropDownItem.propTypes = {
  item: PropTypes.shape({
    search: PropTypes.string,
    offer: PropTypes.string,
    id: PropTypes.number,
  }),
};

FeatureCard.propTypes = {
  src: PropTypes.string,
  text: PropTypes.string,
  textUa: PropTypes.string,
};

export default Careers;
