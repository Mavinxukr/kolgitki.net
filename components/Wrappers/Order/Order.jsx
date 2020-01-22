import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Field, Form } from 'react-final-form';
import styles from './Order.scss';
import MainLayout from '../../Layout/Global/Global';
import Checkbox from '../../Layout/Checkbox/Checkbox';
import {
  composeValidators,
  emailValidation,
  required,
} from '../../../utils/validation';
import InputFormWrapper from '../../InputFormWrapper/InputFormWrapper';

const DropDownWrapper = ({ title, children, id }) => (
  <div className={styles.dropDownBlock}>
    <input type="checkbox" id={id} className={styles.field} />
    <ul className={styles.dropDownList} uk-accordion="multiple: true;">
      <li className="uk-open">
        <label
          className={`${styles.dropDownWrapperController} uk-accordion-title`}
          htmlFor={id}
        >
          {title}
        </label>
        <div className="uk-accordion-content">{children}</div>
      </li>
    </ul>
  </div>
);

const renderInput = props => ({ input, meta }) => (
  <InputFormWrapper inputProps={input} meta={meta} {...props} />
);

const Order = () => {
  const [shouldCreateAccount, setShouldCreateAccount] = useState(false);

  const onSubmit = values => console.log(values);

  return (
    <MainLayout>
      <div className={styles.content}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, invalid }) => (
            <form className={styles.orderContent}>
              <div className={styles.orderSteps}>
                <DropDownWrapper id="info" title="Информация">
                  <form className={styles.form}>
                    <div className={styles.formGroup}>
                      <Field
                        name="sername"
                        validate={composeValidators(required, emailValidation)}
                      >
                        {renderInput({
                          placeholder: 'Фамилия',
                          type: 'text',
                          classNameWrapperForInput: styles.field,
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="name"
                        validate={composeValidators(required, emailValidation)}
                      >
                        {renderInput({
                          placeholder: 'Имя',
                          type: 'text',
                          classNameWrapperForInput: styles.field,
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="patronymic"
                        validate={composeValidators(required, emailValidation)}
                      >
                        {renderInput({
                          placeholder: 'Отчество',
                          type: 'text',
                          classNameWrapperForInput: styles.field,
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="e-mail"
                        validate={composeValidators(required, emailValidation)}
                      >
                        {renderInput({
                          placeholder: 'E-mail',
                          type: 'email',
                          classNameWrapperForInput: styles.field,
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                      <Field
                        name="number"
                        validate={composeValidators(required, emailValidation)}
                      >
                        {renderInput({
                          placeholder: '+38 (____) ___ __ __',
                          type: 'number',
                          classNameWrapperForInput: styles.field,
                          viewTypeForm: 'info',
                          classNameWrapper: styles.inputWrapper,
                        })}
                      </Field>
                    </div>
                    <Checkbox
                      classNameWrapper={styles.checkboxWrapper}
                      id="info"
                      title="Создать аккаунт"
                      checked={shouldCreateAccount}
                      onChange={setShouldCreateAccount}
                    />
                  </form>
                </DropDownWrapper>
              </div>
              <div className={styles.orderInfo}>hello</div>
            </form>
          )}
        />
      </div>
    </MainLayout>
  );
};

DropDownWrapper.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
};

export default Order;
