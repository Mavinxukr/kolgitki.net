export const required = (value) => {
  if (!value || value.length === 0) {
    return 'поле обязательно к заполнению';
  }
  return undefined;
};

export const emailValidation = (value) => {
  if (!/^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/.test(value)) {
    return 'введите корректный e-mail';
  }
  return undefined;
};

export const snpValidation = (value) => {
  if (/\d+$/g.test(value)) {
    return 'имя не должно содержать цыфры';
  }

  return undefined;
};

export const numberValidation = (value) => {
  if (!/\d+$/g.test(value)) {
    return 'номер должен содержать только цифры';
  }

  return undefined;
};

export const passwordValidation = (value) => {
  if (value.length < 8) {
    return 'поле пароля не должно содержать меньше 8 символов';
  }
  return undefined;
};

export const composeValidators = (...validators) => value => (
  validators.reduce((acc, current) => acc || current(value), undefined)
);
