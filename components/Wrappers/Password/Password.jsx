import React from 'react';
import styles from './Password.scss';
import FormWrapper from '../../Layout/FormWrapper/FormWrapper';
import Input from '../../Input/Input';

const Password = ({ title, placeholder }) => (
  <FormWrapper>
    <h3>{title}</h3>
    <div className={styles.inputs}>
      <Input placeholder={placeholder} />
    </div>
  </FormWrapper>
);

export default Password;
