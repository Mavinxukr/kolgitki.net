import React from 'react';
import Styles from './Slide.module.scss';

const Slide = () => (
  <div className={Styles.Slide}>
    <div className={Styles.Slide__InfoBlock}>
      <h2 className={Styles.Slide__Title}>Скидки до -50% на все бренды</h2>
      <p className={Styles.Slide__Desc}>Зима 19-20 / Giulia</p>
      <button className={Styles.Slide__Button} type="button">Подробнее</button>
    </div>
  </div>
);

export default Slide;
