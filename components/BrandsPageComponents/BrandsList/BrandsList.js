import React from 'react';
import { data } from './data';
import BrandCard from '../BrandCard/BrandCard';
import Styles from './BrandsList.module.scss';

const BrandsList = () => (
  <div className={Styles.BrandsList}>
    {
      data.map(item => (
        <div className={Styles.BrandsList__Content}>
          <p className={Styles.BrandsList__Letter}>{item.letter}</p>
          <div className={Styles.BrandsList__Cards}>
            {
              item.foundBrands.map(itemBrand => <BrandCard key={item.idBrand} item={itemBrand} />)
            }
          </div>
        </div>
      ))
    }
  </div>
);

export default BrandsList;
