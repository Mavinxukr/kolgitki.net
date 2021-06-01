import React from 'react';
import ProductCard from '../../../Layout/ProductCard/ProductCard';
import CardProduct from '../../../Layout/CardProduct/CardProduct';

import styles from './StockProductsList.scss';
import { withResponse } from '../../../hoc/withResponse';

const StockProductsList = React.memo(({ products }) => {
  return (
    <div className={styles.block}>
      {products.goods.data.map(product => (
        <CardProduct data={product} />
        // <ProductCard
        //   key={product.id}
        //   item={product}
        //   classNameWrapper={styles.card}
        //   isSimpleProduct
        //   userDataId={3}
        // ></ProductCard>
      ))}
      {products.goods.data.length < 1 && <p>Товаров нет</p>}
    </div>
  );
});

export default withResponse(StockProductsList);
