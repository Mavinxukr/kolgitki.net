import React, { useCallback } from 'react';
import dynamic from 'next/dynamic';
import { Field, Form } from 'react-final-form';
import { useDropzone } from 'react-dropzone';
import formatString from 'format-string-by-pattern';
import Button from '../../../Layout/Button/Button';
import {
  composeValidators,
  snpValidation,
  numberValidation,
  required,
} from '../../../../utils/validation';
import { renderInput } from '../../../../utils/renderInputs';
import styles from './Careers.scss';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false },
);

const onSubmit = (values) => {
  console.log(values);
};

const DropDownItem = () => {
  const onDrop = useCallback((acceptedFiles) => {
    console.log((acceptedFiles));
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className={styles.info}>
      <h6 className={styles.infoTitle}>Кого мы ищем?</h6>
      <p className={styles.infoDesc}>
        На протяжении веков украинский народ развивал собственное музыкально
        искусство, театр и живопись. Некоторые украинские художники и их шедев
        известны не только в Украине, но и во всем мире.
      </p>
      <ul className={styles.featuresList}>
        <li className={styles.featuresItem}>Высокую заработную плату</li>
        <li className={styles.featuresItem}>Систему KPI и Материального</li>
        <li className={styles.featuresItem}>Высокую заработную плату</li>
        <li className={styles.featuresItem}>Систему KPI и Материального</li>
      </ul>
      <h2 className={styles.infoTitle}>Что мы предлагаем?</h2>
      <p className={styles.infoDesc}>
        На протяжении веков украинский народ развивал собственное музыкально
        искусство, театр и живопись. Некоторые украинские художники и их шедев
        известны не только в Украине, но и во всем мире.
      </p>
      <ul className={styles.featuresList}>
        <li className={styles.featuresItem}>Высокую заработную плату</li>
        <li className={styles.featuresItem}>Систему KPI и Материального</li>
      </ul>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, invalid }) => (
          <form onSubmit={handleSubmit} className={styles.form}>
            <h6>Подать заявку</h6>
            <div className={styles.inputWrapper}>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <button className={styles.loadController} type="button">
                  + Загрузить резюме
                </button>
              </div>
              <div className={styles.inputGroup}>
                <Field
                  name="spn"
                  type="text"
                  validate={composeValidators(required, snpValidation)}
                  render={renderInput({
                    placeholder: 'Имя',
                    classNameWrapper: styles.textFieldWrapper,
                    viewTypeForm: 'profileForm',
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
                    classNameWrapper: styles.textFieldWrapper,
                  })}
                />
              </div>
            </div>
            <Button
              classNameWrapper={styles.formButton}
              buttonType="submit"
              disabled={submitting || invalid}
              title="Отправить"
              viewType="black"
            />
          </form>
        )}
      />
    </div>
  );
};

const Careers = () => (
  <div className={styles.careers}>
    <h3 className={styles.title}>Вакансии</h3>
    <ul className={styles.accordion} uk-accordion="multiple: true">
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Продавец в магазин"
        toggled
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Оператор колцентра"
        toggled={false}
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Аккаунт менеджер"
        toggled={false}
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
      <DynamicComponentWithNoSSRAccordion
        classNameWrapper={styles.item}
        addClassNameWrapper={styles.itemOpen}
        title="Фотограф"
        toggled={false}
      >
        <DropDownItem />
      </DynamicComponentWithNoSSRAccordion>
    </ul>
  </div>
);

export default Careers;
