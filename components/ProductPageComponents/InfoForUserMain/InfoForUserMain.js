import React from 'react';
import SimilarProduct from '../SimilarProducts/SimilarProducts';
import Styles from './InfoForUserMain.module.scss';

const InfoForUserMain = () => (
  <div className={Styles.InfoForUserMain}>
    <SimilarProduct />
  </div>
);

export default InfoForUserMain;
