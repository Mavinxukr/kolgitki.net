import React from 'react';
import Form from '../components/Wrappers/Form/Form';
import Input from '../components/Layout/Input/Input';
import ButtonForm from '../components/Layout/ButtonForm/ButtonForm';

const PasswordRecover = () => (
  <Form>
    <h3>Новый пароль</h3>
    <Input placeholder="Введите новый пароль" />
    <ButtonForm title="Обновить пароль" />
  </Form>
);

export default PasswordRecover;
