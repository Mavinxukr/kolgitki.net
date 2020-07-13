import React, { useState } from 'react';
import { useRouter } from 'next/router';
import { Form, Field } from 'react-final-form';
import Link from 'next/link';
import formatString from 'format-string-by-pattern';
import styles from './BuyOneClick.scss';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import Button from '../../Layout/Button/Button';
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

const BuyOneClick = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const router = useRouter();

  const onSubmit = (values) => {
    buyOneClickRequest({}, { ...values, ...router.query }).then((response) => {
      if (response.status) {
        router.push('/');
      } else {
        setErrorMessage('номер не корректный');
      }
    });
  };

  return (
    <FormWrapper>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit, submitting, invalid }) => (
          <form className={styles.form} onSubmit={handleSubmit}>
            <h3 className={styles.title}>
              {parseText(cookies, 'Купить в один клик' , 'Купити в один клік')}
            </h3>
            <Field
              type="text"
              name="phone"
              parse={formatString('+38 (099) 999 99 99')}
              validate={composeValidators(required, numberValidation)}
              render={renderInput({
                placeholder: 'Введите номер',
                placeholderUa: 'ВВедіть номер',
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
            <Link href="/" prefetch={false}>
              <a className={styles.closeButton}>
                <IconExit />
              </a>
            </Link>
          </form>
        )}
      />
    </FormWrapper>
  );
};

export default BuyOneClick;
