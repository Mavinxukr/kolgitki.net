const generateAction = namespace => ({
  request: `${namespace}/request`,
  success: `${namespace}/success`,
  error: `${namespace}/error`,
  save: `${namespace}/save`,
  update: `${namespace}/update`,
  delete: `${namespace}/delete`,
});

export const comment = generateAction('comment');
export const currentUser = generateAction('currentUser');
export const cart = generateAction('cart');
export const product = generateAction('product');
export const products = generateAction('products');
export const blog = generateAction('blog');
