import React from 'react';
import Form from '../components/Wrappers/Form/Form';
import Input from '../components/Layout/Input/Input';
import ButtonForm from '../components/Layout/ButtonForm/ButtonForm';

const PasswordRecover = () => (
  <Form>
    <h3>Восстановление пароля</h3>
    <Input placeholder="Ваш E-mail" />
    <ButtonForm title="Восстановить пароль" />
  </Form>
);

export default PasswordRecover;
