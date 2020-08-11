import React, { useState, useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import formatString from 'format-string-by-pattern';
import Loader from 'react-loader';
import styles from './BuyOneClick.scss';
import Button from '../../Layout/Button/Button';
import ThankForPurchase from '../ThankForPurchase/ThankForPurchase';
import { cookies } from '../../../utils/getCookies';
import { parseText } from '../../../utils/helpers';
import IconExit from '../../../public/svg/Group795.svg';
import { buyOneClickRequest } from '../../../services/product';
import {
  composeValidators,
  numberValidation,
  required,
} from '../../../utils/validation';
import { renderInput } from '../../../utils/renderInputs';

const BuyOneClick = ({ closePopup, content, openPopup }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isLoading) {
      const loader = document.querySelector('.loader');
      loader.classList.add(styles.loader);
    }
  }, [isLoading]);

  const onSubmit = (values) => {
    setIsLoading(true);
    buyOneClickRequest({}, { ...values, ...content }).then((response) => {
      setIsLoading(false);
      if (response.status) {
        openPopup(<ThankForPurchase closePopup={closePopup} content={response.message} />);
      } else {
        setErrorMessage('номер не корректный');
      }
    });
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, invalid }) => (
        <form className={styles.form} onSubmit={handleSubmit}>
          <h3 className={styles.title}>
            {parseText(cookies, 'Купить в 1 клик', 'Купити в 1 клік')}
          </h3>
          <Field
            type="text"
            name="phone"
            parse={formatString('+38 (099) 999 99 99')}
            validate={composeValidators(required, numberValidation)}
            render={renderInput({
              placeholder: 'Ваш номер телефона',
              placeholderUa: 'Ваш номер телефону',
              viewTypeForm: 'userForm',
              classNameWrapper: styles.inputWrapper,
              classNameWrapperForInput: styles.input,
            })}
          />
          {errorMessage && (
            <p className={styles.errorMessage}>{errorMessage}</p>
          )}
          <Button
            width="100%"
            buttonType="submit"
            viewType="red"
            title="Купить"
            titleUa="Купити"
            disabled={invalid || submitting}
          />
          <button
            type="button"
            onClick={() => closePopup()}
            className={styles.closeButton}
          >
            <IconExit className={styles.closeIcon} />
          </button>
        </form>
      )}
    />
  );
};

export default BuyOneClick;
