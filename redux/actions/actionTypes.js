const generateAction = namespace => ({
  request: `${namespace}/request`,
  success: `${namespace}/success`,
  error: `${namespace}/error`,
});

export const comment = generateAction('comment');