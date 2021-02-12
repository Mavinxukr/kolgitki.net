import React from 'react';
import ProductCard from '../../../Layout/ProductCard/ProductCard';
import classes from './StokProductsList.scss';

const StokProductsList = React.memo(({ products }) => {
  return (
    <div className={classes.block}>
      {products.data.map(product => (
        <ProductCard
          key={product.id}
          item={product}
          classNameWrapper={classes.card}
          isSimpleProduct
          userDataId={3}
        ></ProductCard>
      ))}
    </div>
  );
});

export default StokProductsList;
