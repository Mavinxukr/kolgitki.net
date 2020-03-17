import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { Field, Form } from 'react-final-form';
import PropTypes from 'prop-types';
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
import { sendCandidate } from '../../../../services/About/careers';
import styles from './Careers.scss';

const DynamicComponentWithNoSSRAccordion = dynamic(
  () => import('../../../Accordion/Accordion'),
  { ssr: false },
);

const DropDownItem = ({ item }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    setSelectedFile(acceptedFiles[0]);
  }, []);

  useEffect(() => {
    document.querySelector(
      '.Careers_infoDesc',
    ).innerHTML = `${item.search}${item.offer}`;
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
      <p className={styles.infoDesc} />
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
                <p>
                  {(selectedFile && selectedFile.name)
                    || 'Резюме обязательно, загрузите резюме'}
                </p>
              </div>
              <div className={styles.inputGroup}>
                <Field
                  name="name"
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
                  parse={formatString('+38 (999) 999 99 99')}
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
              disabled={submitting || invalid || !selectedFile}
              title="Отправить"
              viewType="black"
            />
            {isSuccess && <p>Ваша заявка успешно отправлена</p>}
          </form>
        )}
      />
    </div>
  );
};

const Careers = ({ vacancies }) => (
  <div className={styles.careers}>
    <h3 className={styles.title}>Вакансии</h3>
    <ul className={styles.accordion} uk-accordion="multiple: true">
      {vacancies.map(item => (
        <DynamicComponentWithNoSSRAccordion
          key={item.id}
          classNameWrapper={styles.item}
          addClassNameWrapper={styles.itemOpen}
          title={item.name}
        >
          <DropDownItem item={item} />
        </DynamicComponentWithNoSSRAccordion>
      ))}
    </ul>
  </div>
);

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

export default Careers;
