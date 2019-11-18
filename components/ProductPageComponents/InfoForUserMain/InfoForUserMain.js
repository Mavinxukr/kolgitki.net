import React from 'react';
import SimilarProduct from '../SimilarProducts/SimilarProducts';
import ComponentDropdowns from '../ComponentDropdowns/ComponentDropdowns';
import Styles from './InfoForUserMain.module.scss';

const InfoForUserMain = () => (
  <div className={Styles.InfoForUserMain}>
    <SimilarProduct />
    <ComponentDropdowns />
  </div>
);

export default InfoForUserMain;
