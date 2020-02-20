import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Field } from 'react-final-form';
import cx from 'classnames';
import styles from './Data.scss';
import UserData from '../../UserData/UserData';
import Button from '../../../Layout/Button/Button';
import { renderInput } from '../../../../utils/renderInputs';
import {
  composeValidators,
  required,
  snpValidation,
  emailValidation,
} from '../../../../utils/validation';

const Data = ({ changeEditValue }) => {
  const [isEditWorkMates, setIsEditWorkMates] = useState(false);

  const classNameForWorkMatesInfo = cx(styles.workMatesInfo, {
    [styles.workMatesInfoNoPadding]: !isEditWorkMates,
  });

  const onSubmit = values => {
    console.log(values)
    setIsEditWorkMates(false)
  };

  return (
    <UserData changeEditValue={changeEditValue}>
      <div>
        <div className={styles.workMatesBLock}>
          <h3>Сотрудники</h3>
          <div className={classNameForWorkMatesInfo}>
            <div>
              <p>Наталия Ингина</p>
              <p className={styles.workMatesEmail}>ni@netkolgotok.com</p>
            </div>
            {isEditWorkMates ? (
              <button className={styles.itemButtonDelete} type="button">
                Удалить
              </button>
            ) : null}
          </div>
        </div>
        {
          isEditWorkMates ? (
            <Form
              onSubmit={onSubmit}
              render={({ handleSubmit, invalid, submitting }) => (
                <form onSubmit={handleSubmit}>
                  <div className={styles.workMatesFormWrapper}>
                    <p>Добавить сотрудника</p>
                    <div className={styles.workMatesFormInfo}>
                      <Field
                        name="snp"
                        validate={composeValidators(required, snpValidation)}
                        render={renderInput({
                          placeholder: 'ФИО',
                          classNameWrapper: styles.inputWrapper,
                          viewTypeForm: 'profileForm',
                          type: 'text',
                        })}
                      />
                      <Field
                        name="email"
                        validate={composeValidators(required, emailValidation)}
                        render={renderInput({
                          placeholder: 'Email',
                          classNameWrapper: styles.inputWrapper,
                          viewTypeForm: 'profileForm',
                          type: 'email',
                        })}
                      />
                    </div>
                  </div>
                  <Button
                    title="Добавить сотрудника"
                    classNameWrapper={styles.workMatesButton}
                    viewType="auth"
                    buttonType="submit"
                    disabled={invalid || submitting}
                  />
                </form>
              )}
            />
          ) : null
        }
        {
          !isEditWorkMates ? (
            <Button
              title="Добавить сотрудника"
              classNameWrapper={styles.workMatesButton}
              viewType="auth"
              buttonType="submit"
              onClick={() => setIsEditWorkMates(true)}
            />
          ) : null
        }
      </div>
      <hr className={styles.line} />
    </UserData>
  );
};

Data.propTypes = {
  changeEditValue: PropTypes.func,
};

export default Data;
