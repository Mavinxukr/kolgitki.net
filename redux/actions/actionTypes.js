const generateAction = namespace => ({
  request: `${namespace}/request`,
  success: `${namespace}/success`,
  error: `${namespace}/error`,
});

export const brands = generateAction('brands');
export const userData = generateAction('userData');
