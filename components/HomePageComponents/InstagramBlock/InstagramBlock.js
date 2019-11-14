import React from 'react';
import Styles from './InstagramBlock.module.scss';

const InstagramBlock = () => (
  <div className={Styles.InstagramBlock}>
    <div className={Styles.InstagramBlock__Header}>
      <h2 className={Styles.InstagramBlock__Title}>Kolgot.net в Инстаграм</h2>
      <a href="/" className={Styles.InstagramBlock__Link}>Открыть</a>
    </div>
    <div className={Styles.InstagramBlock__Images}>
      <div className={Styles.InstagramBlock__Image} />
      <div className={Styles.InstagramBlock__Image} />
      <div className={Styles.InstagramBlock__Image} />
      <div className={Styles.InstagramBlock__Image} />
      <div className={Styles.InstagramBlock__Image} />
    </div>
  </div>
);

export default InstagramBlock;
