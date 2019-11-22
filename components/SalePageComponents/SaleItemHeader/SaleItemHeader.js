import React from 'react';
import Styles from './SaleItemHeader.module.scss';

const SaleItemHeader = ({ colorStep, title, id, count }) => (
  <div className={Styles.SaleItemHeader__WrapperMain}>
    <div className={Styles.SaleItemHeader}>
      <div className={Styles.SaleItemHeader__Wrapper}>
        <p className={Styles.SaleItemHeader__Step} style={{ color: `${colorStep}` }}><span style={{ background: `${colorStep}` }} className={Styles.SaleItemHeader__StepPre} /> Шаг {count}:</p>
        <div className={Styles.SaleItemHeader__TitleBlock}>
          <p className={Styles.SaleItemHeader__Title}>{title}</p>
          <label className={Styles.SaleItemHeader__Controller} htmlFor={id} />
        </div>
      </div>
    </div>
  </div>
);

export default SaleItemHeader;
