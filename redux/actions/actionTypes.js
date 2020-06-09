const generateAction = namespace => ({
  request: `${namespace}/request`,
  success: `${namespace}/success`,
  error: `${namespace}/error`,
  save: `${namespace}/save`,
  update: `${namespace}/update`,
  delete: `${namespace}/delete`,
  clear: `${namespace}/clear`,
});

export const comment = generateAction('comment');
export const currentUser = generateAction('currentUser');
export const cart = generateAction('cart');
export const product = generateAction('product');
export const products = generateAction('products');
export const blog = generateAction('blog');
export const bonuses = generateAction('bonuses');
export const favourite = generateAction('favourite');
export const documents = generateAction('documents');
export const workers = generateAction('workers');
export const order = generateAction('order');
export const catalogProducts = generateAction('catalogProducts');
export const presentSets = generateAction('presentSets');
export const presentSet = generateAction('presentSet');
export const stocks = generateAction('stocks');
export const stockData = generateAction('stockData');
