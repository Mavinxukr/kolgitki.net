const generateAction = namespace => ({
  request: `${namespace}/request`,
  success: `${namespace}/success`,
  error: `${namespace}/error`,
});

export const registration = generateAction('registration');
export const currentUser = generateAction('login');
