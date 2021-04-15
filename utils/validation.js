import { parseText } from './helpers';
import { cookies } from './getCookies';

export const required = value => {
  if (!value || value.length === 0) {
    return parseText(
      cookies,
      'поле обязательно к заполнению',
      `
поле обов'язково до заповнення`
    );
  }
  return undefined;
};

export const emailValidation = value => {
  if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value)) {
    return parseText(
      cookies,
      'введите корректный e-mail',
      'введіть коректний e-mail'
    );
  }
  return false;
};

export const snpValidation = value => {
  if (/\d+$/g.test(value)) {
    return parseText(
      cookies,
      'имя не должно содержать цифры',
      "ім'я не повинно містити цифри"
    );
  }

  return undefined;
};

export const numberValidation = value => {
  if (
    !/\d+$/g.test(value) ||
    !/^(\+38\ )\((0)\d{2}\)(\ )\d{3}(\ )\d{2}(\ )\d{2}$/.test(value)
  ) {
    return parseText(cookies, 'номер не валиден', 'номер не валідний');
  }

  return undefined;
};

export const passwordValidation = value => {
  if (value.length < 8) {
    return parseText(
      cookies,
      'поле пароля не должно содержать меньше 8 символов',
      'поле пароля не повинно містити менше 8 символів'
    );
  }
  return undefined;
};

export const composeValidators = (...validators) => value =>
  validators.reduce((acc, current) => acc || current(value), undefined);
