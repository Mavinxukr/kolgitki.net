import React from 'react';
import styles from './Password.scss';
import FormWrapper from '../../Layout/Form/FormWrapper';
import Input from '../../Layout/Input/Input';
import ButtonForm from '../../Layout/ButtonForm/ButtonForm';

const Password = ({ title, placeholder, buttonValue }) => (
  <FormWrapper>
    <h3>{title}</h3>
    <div className={styles.inputs}>
      <Input placeholder={placeholder} />
    </div>
    <ButtonForm title={buttonValue} />
  </FormWrapper>
);

export default Password;
