import React from 'react';
import styles from './Password.scss';
import Form from '../../Layout/Form/Form';
import Input from '../../Layout/Input/Input';
import ButtonForm from '../../Layout/ButtonForm/ButtonForm';

const Password = ({ title, placeholder, buttonValue }) => (
  <Form>
    <h3>{title}</h3>
    <div className={styles.inputs}>
      <Input placeholder={placeholder} />
    </div>
    <ButtonForm title={buttonValue} />
  </Form>
);

export default Password;
